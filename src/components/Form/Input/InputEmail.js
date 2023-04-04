import { Input } from "@nextui-org/react"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"
import { useState } from "react"

function InputEmail({ onChange }) {
	const [email, setEmail] = useState("")

	const [validateEmail, setValidateEmail] = useState({
		isValidated: false,
		message: "Not be empty",
		showMessage: false,
	})

	const handlerEmail = (ev) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!ev.target.value) {
			setValidateEmail((state) => {
				return {
					...state,
					isValidated: false,
					message: "Email không được bỏ trống",
					showMessage: true,
				}
			})
		} else if (!emailRegex.test(ev.target.value)) {
			setValidateEmail((state) => {
				return {
					...state,
					isValidated: false,
					message: "Email không đúng định dạng",
					showMessage: true,
				}
			})
		} else {
			setValidateEmail((state) => {
				return {
					...state,
					isValidated: true,
					message: "OK!",
					showMessage: false,
				}
			})
		}
		setEmail(ev.target.value)

		const infoEmail = {
			email: ev.target.value,
			validateEmail: validateEmail,
		}

		onChange(infoEmail)
	}

	return (
		<>
			<Input
				type="email"
				underlined
				contentLeft={<i class="fa-solid fa-envelope"></i>}
				placeholder="Email"
				onChange={handlerEmail}
				value={email}
			/>
			<ValidInput
				message={validateEmail.message}
				hidden={!validateEmail.showMessage}
				isValid={validateEmail.isValidated}
			/>
		</>
	)
}

export default InputEmail
