import { Input } from "@nextui-org/react"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"
import { useState } from "react"

function BaseInput({
	name,
	regex = null,
	type = "text",
	minLength = 0,
	maxLength = 100,
	length = null,
	allowSpaces = true,
	contentLeft,
	contentRight,
	placeholder = "",
}) {
	const [value, setValue] = useState("")

	const [validateValue, setValidateValue] = useState({
		info: "Required to fill in",
		showInfo: false,
	})

	const handlerValue = (ev) => {
		let valueInput = ev.target.value

		valueInput = allowSpaces ? valueInput : valueInput.replace(" ", "")
		valueInput =
			type === "number" ? valueInput.replace(/[^\d]/g, "") : valueInput
		if (!valueInput) {
			setValidateValue((state) => {
				return {
					...state,
					isValidate: false,
					info: name ? `${name} not be empty` : "Not be empty",
					showInfo: true,
				}
			})
		} else if (length && valueInput.length != length) {
			setValidateValue((state) => {
				return {
					...state,
					isValidate: false,
					info: `${name} có độ dài là ${length}.`,
					showInfo: true,
				}
			})
		} else if (valueInput.length < minLength) {
			setValidateValue((state) => {
				return {
					...state,
					isValidate: false,
					info: `Minimum length is ${minLength}.`,
					showInfo: true,
				}
			})
		} else if (valueInput.length > maxLength) {
			setValidateValue((state) => {
				return {
					...state,
					isValidate: false,
					info: `Maximum length is ${maxLength}.`,
					showInfo: true,
				}
			})
		} else if (regex && !regex.test(valueInput)) {
			setValidateValue((state) => {
				return {
					...state,
					isValidate: false,
					info: name ? `${name} không đúng định dạng` : "Không đúng định dạng",
					showInfo: true,
				}
			})
		} else if (
			type === "email" &&
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valueInput)
		) {
			setValidateValue((state) => {
				return {
					...state,
					isValidate: false,
					info: `Email không đúng định dạng`,
					showInfo: true,
				}
			})
		} else if (type === "password" && valueInput.search(" ") !== -1) {
			setValidateValue((state) => {
				return {
					...state,
					isValidate: false,
					info: name ? `${name} không chứa dấu cách` : "Không chứa dấu cách",
					showInfo: true,
				}
			})
		} else {
			setValidateValue((state) => {
				return {
					...state,
					isValidate: true,
					info: "OK!",
					showInfo: false,
				}
			})
		}
		const infoInput = {
			value: valueInput,
			validateValue: validateValue,
		}

		setValue(valueInput)
	}

	return (
		<>
			{type == "password" && (
				<>
					<Input.Password
						underlined
						contentLeft={contentLeft}
						placeholder={placeholder}
						onChange={handlerValue}
						value={value}
						minLength={8}
					/>
					<ValidInput
						message={validateValue.info}
						hidden={!validateValue.showInfo}
						isValid={validateValue.isValidate}
					/>
				</>
			)}
			{type !== "password" && (
				<>
					<Input
						underlined
						contentLeft={contentLeft}
						contentRight={contentRight}
						placeholder={placeholder}
						onChange={handlerValue}
						value={value}
					/>
					<ValidInput
						message={validateValue.info}
						hidden={!validateValue.showInfo}
						isValid={validateValue.isValidate}
					/>
				</>
			)}
		</>
	)
}

export default BaseInput
