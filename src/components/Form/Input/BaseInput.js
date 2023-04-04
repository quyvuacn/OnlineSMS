import { Input } from "@nextui-org/react"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"
import { useState, useEffect } from "react"

function BaseInput({ onChange, name, regex = null, type = "text" }) {
	const [value, setValue] = useState("")

	const [validateValue, setValidateValue] = useState({
		isValidated: false,
		message: "Not be empty",
		showMessage: false,
	})

	const handlerValue = (ev) => {
		if (regex && !regex.test(ev.target.value)) {
			setValidateValue({
				isValidated: false,
				message: "Không đúng định dạng",
				showMessage: true,
			})
		} else if (!ev.target.value) {
			setValidateValue({
				isValidated: false,
				message: name ? `${name} not be empty` : "Not be empty",
				showMessage: true,
			})
		} else {
			setValidateValue({
				isValidated: true,
				message: "OK!",
				showMessage: false,
			})
		}

		setValue(ev.target.value)

		const infoInput = {
			value: ev.target.value,
			validateValue: validateValue,
		}

		onChange(infoInput)
	}

	return (
		<>
			<Input
				underlined
				contentLeft={<i className="fa-solid fa-user"></i>}
				placeholder="Username"
				onChange={handlerValue}
				value={value}
			/>
			<ValidInput
				message={validateValue.message}
				hidden={!validateValue.showMessage}
				isValid={validateValue.isValidated}
			/>
		</>
	)
}

export default BaseInput
