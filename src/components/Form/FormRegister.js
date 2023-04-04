import { Card, Text, Input, Button, Spacer } from "@nextui-org/react"
import SendButton from "@/customizeNextUI/nextui-org/SendButton"
import Link from "@/customizeNextUI/nextui-org/Link"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"
import { useState, useEffect } from "react"

import InputEmail from "./Input/InputEmail"
import BaseInput from "./Input/BaseInput"

function FormRegister() {
	const [userName, setUserName] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [verifycode, setVerifycode] = useState("")

	const [validateUserName, setValidateUserName] = useState({
		isValidated: false,
		message: "Not be empty",
		showMessage: false,
	})

	const [validateEmail, setValidateEmail] = useState({
		isValidated: false,
		message: "Not be empty",
		showMessage: false,
	})

	const [validatePhoneNumber, setValidatePhoneNumber] = useState({
		isValidated: false,
		message: "Not be empty",
		showMessage: false,
	})

	const handlerUserName = ({ value, validateValue }) => {
		setEmail(value)
		setValidateEmail(validateValue)
	}

	const handlerPhoneNumber = ({ phoneNumber, validatePhoneNumber }) => {
		// setPhoneNumber(ev.target.value.replace(/\D/, ""))
		setPhoneNumber(phoneNumber)
		setValidatePhoneNumber(validatePhoneNumber)
	}

	const handlerEmail = ({ email, validateEmail }) => {
		setEmail(email)
		setValidateEmail(validateEmail)
	}

	const handlerPassword = (ev) => {
		setPassword(ev.target.value)
	}

	const handlerConfirmPassword = (ev) => {
		setConfirmPassword(ev.target.value)
	}
	const handlerVerifycode = (ev) => {
		setVerifycode(ev.target.value.replace(/\D/, ""))
	}

	useEffect(() => {}, [
		userName,
		phoneNumber,
		email,
		password,
		confirmPassword,
		verifycode,
	])

	return (
		<Card>
			<Card.Body>
				<BaseInput
					onChange={handlerUserName}
					name="Username"
					regex={/^[a-zA-Z0-9]+$/}
				/>

				<Input
					underlined
					contentLeft={<i className="fa-solid fa-mobile"></i>}
					placeholder="Phone Number"
					onChange={handlerPhoneNumber}
					value={phoneNumber}
				/>
				<ValidInput message="Số điện thoại không hợp lệ" hidden={false} />

				<InputEmail onChange={handlerEmail} />

				<Input.Password
					underlined
					contentLeft={<i className="fa-solid fa-lock-alt"></i>}
					placeholder="Password"
					onChange={handlerConfirmPassword}
					value={confirmPassword}
				/>
				<ValidInput message="Số điện thoại không hợp lệ" hidden={false} />

				<Input.Password
					placeholder="Confirm Password"
					underlined
					contentLeft={<i className="fa-solid fa-lock-alt"></i>}
					onChange={handlerPassword}
					value={password}
				/>
				<ValidInput message="Số điện thoại không hợp lệ" hidden={false} />
				<Input
					underlined
					contentLeft={<i className="fa-sharp fa-solid fa-shield-check"></i>}
					placeholder="Code hết hạn sau 5p"
					onChange={handlerVerifycode}
					value={verifycode}
					contentRight={
						<SendButton>
							<i
								className="fa-solid fa-paper-plane-top"
								style={{ color: "#0072F5" }}
							></i>
						</SendButton>
					}
					contentRightStyling={false}
					minLength={6}
					maxLength={6}
				/>
				<ValidInput message="Số điện thoại không hợp lệ" />

				<Text span size="$xs">
					Gửi lại code sau : 20s
				</Text>
				<Spacer y={0.5} />
				<Button>Register</Button>
				<Spacer y={0.5} />
				<Link
					href={"/login"}
					css={{ margin: "0 auto", color: "gray", fontSize: "14px" }}
				>
					Login
				</Link>
			</Card.Body>
		</Card>
	)
}

export default FormRegister
