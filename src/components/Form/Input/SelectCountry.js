import { useState, useRef, useEffect } from "react"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import classNames from "classnames/bind"
import styles from ".././form.module.css"
import countryCodes from "@/common/countryCodes"
import { setCountry } from "@/redux/actions/actionFormRegister"
const cx = classNames.bind(styles)

function SelectCountry() {
	const formRegister = useSelector((state) => state.formRegister)
	const country = formRegister.country
	const dispatch = useDispatch()

	const selectRef = useRef(null)

	const handleCountry = (ev) => {
		console.log(ev)
		dispatch(setCountry(ev))
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

	return (
		<Select
			options={countryCodes}
			placeholder={country.label}
			onChange={handleCountry}
			value={country.code}
			ref={selectRef}
			closeMenuOnSelect={true}
			filterOption={filterOption}
		/>
	)
}

export default SelectCountry
