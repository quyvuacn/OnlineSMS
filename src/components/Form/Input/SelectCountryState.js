import { useState, useRef, useEffect } from "react"
import parsePhoneNumber from "libphonenumber-js"
import Select from "react-select"
import classNames from "classnames/bind"
import styles from ".././form.module.css"
import countryCodes from "@/common/countryCodes"
import { Input, Text } from "@nextui-org/react"
import useDebounce from "@/hooks/useDebounce"

const cx = classNames.bind(styles)

function SelectCountryState({ onSearch }) {
	const [phoneNumber, setPhoneNumber] = useState({
		value: "",
		formatPhonenumber: "",
		country: {
			label: "Vietnam",
			value: "+84",
			code: "VN",
		},
	})

	const debouncedPhoneNumber = useDebounce(phoneNumber, 750)

	const selectRef = useRef(null)

	const handlePhonenumber = (payload) => {
		setPhoneNumber((phoneNumber) => {
			const phone = payload.type == "value" ? payload.value : phoneNumber.value
			const countryCode =
				payload.type == "country"
					? payload.value.code
					: phoneNumber.country.value

			const formatPhonenumber = parsePhoneNumber(
				`${countryCode} ${phone}`,
			)?.number

			return {
				...phoneNumber,
				formatPhonenumber,
				[payload.type]: payload.value,
			}
		})
	}

	const filterOption = (option, inputValue) => {
		let data = option.data
		let input = inputValue.toLowerCase().trim()
		return (
			data.code.toLowerCase().includes(input) ||
			data.label.toLowerCase().includes(input) ||
			data.value.toLowerCase().includes(input)
		)
	}

	useEffect(() => {
		selectRef.current.focus()
	}, [])

	useEffect(() => {
		const { formatPhonenumber, value } = debouncedPhoneNumber
		if (value) {
			onSearch(formatPhonenumber)
		}
	}, [debouncedPhoneNumber])

	return (
		<>
			<Select
				options={countryCodes}
				placeholder={phoneNumber.country.label}
				onChange={(ev) =>
					handlePhonenumber({
						type: "country",
						value: ev,
					})
				}
				value={phoneNumber.country.code}
				ref={selectRef}
				closeMenuOnSelect={true}
				filterOption={filterOption}
				maxMenuHeight={124}
			/>
			<Input
				underlined
				className="search-phoneNumber"
				name="phoneNumber"
				length={10}
				maxLength={10}
				onChange={(ev) =>
					handlePhonenumber({
						type: "value",
						value: ev.target.value,
					})
				}
				contentLeft={
					<Text span size="$sm">
						{phoneNumber.country.value}
					</Text>
				}
				value={phoneNumber.value}
				placeholder="Enter phone number"
				contentLeftStyling={false}
			/>
		</>
	)
}

export default SelectCountryState
