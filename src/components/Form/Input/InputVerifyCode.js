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

function InputVerifyCode({ lenght }) {
	const formRegister = useSelector((state) => state.formRegister)
	const stateInfo = formRegister["verifyCode"]
	const password = formRegister["password"]
	const confirmPassword = formRegister["confirmPassword"]
	const phoneNumber = formRegister["phoneNumber"]

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

	const handlerVerifycode = (ev) => {
		const valueInput = ev.target.value.replace(/\D/, "")
		dispatch(
			action({
				value: valueInput,
			}),
		)
	}

	const sendSMS = () => {
		dispatch(
			action({
				isLoading: true,
			}),
		)

		AuthAPI.verifyPhoneNumber(phoneNumber.value)
			.then((response) => {
				console.log(response)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<>
			<Input
				underlined
				contentLeft={<i className="fa-sharp fa-solid fa-shield-check"></i>}
				placeholder={"Xác minh số điện thoại"}
				onChange={handlerVerifycode}
				value={stateInfo.value}
				contentRight={
					!checkValidateAll && (
						<SendButton onClick={sendSMS}>
							{stateInfo.isLoading ? iconLoading : iconSend}
						</SendButton>
					)
				}
				maxLength={lenght}
				minLength={lenght}
				contentRightStyling={false}
			/>
			<ValidInput message="Số điện thoại không hợp lệ" />

			<Text span size="$xs">
				Gửi lại code sau : 20s
			</Text>
		</>
	)
}

export default InputVerifyCode
