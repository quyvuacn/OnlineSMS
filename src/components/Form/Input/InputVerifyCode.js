import { useEffect, useState } from "react"
import { Input, Text, Loading } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"

import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"
import SendButton from "@/customizeNextUI/nextui-org/SendButton"
import {
	setVerifycode as action,
	setConfirmPassword,
} from "@/redux/actions/actionFormRegister"
import { AuthAPI } from "@/api/authApi"
import Countdown from "./Countdown"

function InputVerifyCode({ lenght }) {
	const formRegister = useSelector((state) => state.formRegister)
	const stateInfo = formRegister["verifyCode"]
	const password = formRegister["password"]
	const confirmPassword = formRegister["confirmPassword"]
	const phoneNumber = formRegister["phoneNumber"]

	const [placeholder, setPlaceholder] = useState("Xác minh số điện thoại")

	const dispatch = useDispatch()

	const checkValidateAll = (() => {
		for (let stateItemKey in formRegister) {
			if (stateItemKey == "verifyCode" || stateItemKey == "validateAll")
				continue
			if (!formRegister[stateItemKey].isValidate) {
				return false
			}
		}
		if (password.value !== confirmPassword.value) {
			dispatch(
				setConfirmPassword({
					isValidate: false,
					info: "Mật khẩu không trùng khớp",
					showInfo: true,
				}),
			)
			return false
		}
		return true
	})()

	const iconSend = (
		<i className="fa-solid fa-paper-plane-top" style={{ color: "#0072F5" }}></i>
	)

	const iconLoading = <Loading size="xs" />

	const countdown = <Countdown stateNumber={60} />

	const handlerVerifycode = (ev) => {
		const valueInput = ev.target.value.replace(/\D/, "")
		dispatch(
			action({
				value: valueInput,
			}),
		)
	}

	const sendSMS = () => {
		if (!stateInfo.isLoading && !stateInfo.disable) {
			dispatch(
				action({
					isLoading: true,
				}),
			)

			AuthAPI.verifyPhoneNumber(phoneNumber.value)
				.then((response) => {
					setPlaceholder("Code hết hạn sau 5p")
					dispatch(
						action({
							isLoading: false,
							isCountdown: true,
							disable: true,
							isValidate: false,
							showInfo: false,
						}),
					)
				})
				.catch((err) => {
					const message = err.message || "Error!"
					dispatch(
						action({
							isLoading: false,
							isCountdown: false,
							disable: false,
							isValidate: false,
							info: message,
							showInfo: true,
						}),
					)
				})
		}
	}

	return (
		<>
			<Input
				underlined
				contentLeft={<i className="fa-sharp fa-solid fa-shield-check"></i>}
				placeholder={placeholder}
				onChange={handlerVerifycode}
				value={stateInfo.value}
				contentRight={
					checkValidateAll && (
						<SendButton onClick={sendSMS}>
							{!stateInfo.isLoading && !stateInfo.disable && iconSend}
							{stateInfo.isLoading && !stateInfo.disable && iconLoading}
							{stateInfo.disable && countdown}
						</SendButton>
					)
				}
				maxLength={lenght}
				minLength={lenght}
				contentRightStyling={false}
			/>
			<ValidInput
				message={stateInfo.info}
				hidden={!stateInfo.showInfo}
				isValid={stateInfo.isValidate}
			/>
		</>
	)
}

export default InputVerifyCode
