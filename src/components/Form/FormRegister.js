import parsePhoneNumber from "libphonenumber-js"
import { Card, Button, Spacer, Text } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"

import Link from "@/customizeNextUI/nextui-org/Link"

import BaseInput from "./Input/BaseInput"
import PopoverSelect from "./Input/PopoverSelect"
import InputVerifyCode from "./Input/InputVerifyCode"
import {
	setUserName,
	setPhoneNumber,
	setEmail,
	setPassword,
	setConfirmPassword,
} from "@/redux/actions/actionFormRegister"
import { clearForm } from "@/redux/reducers/formRegisterSlice"
import { AuthAPI } from "@/api/authApi"
import { useRouter } from "next/router"
import { notify } from "@/redux/reducers/notificationSlice"
import typeNotification from "@/common/typeNotification"

function FormRegister() {
	const formRegister = useSelector((state) => state.formRegister)
	const notification = useSelector((state) => state.notification)
	const password = formRegister["password"]
	const confirmPassword = formRegister["confirmPassword"]
	const phoneNumber = formRegister["phoneNumber"]
	const country = formRegister["country"]

	const dispatch = useDispatch()
	const router = useRouter()
	const checkValidateAll = (() => {
		for (let stateItemKey in formRegister) {
			if (
				stateItemKey == "verifyCode" ||
				stateItemKey == "validateAll" ||
				stateItemKey == "country"
			)
				continue
			if (!formRegister[stateItemKey].isValidate) {
				return false
			}
		}
		if (password.value !== confirmPassword.value) {
			return false
		}
		if (`${formRegister.verifyCode.value}`.length < 6) {
			return false
		}
		return true
	})()

	const submitForm = () => {
		const phoneNumber = formRegister.phoneNumber.value
		const countryCode = formRegister.country.value

		const phoneNumberFormat = parsePhoneNumber(
			`${countryCode} ${phoneNumber}`,
		).number

		const data = {
			userName: formRegister["userName"].value,
			email: formRegister["email"].value,
			phoneNumber: phoneNumberFormat,
			password: formRegister["password"].value,
			verifyCode: formRegister["verifyCode"].value,
		}
		AuthAPI.register(data)
			.then(() => {
				router.push("/login")
				dispatch(
					notify({
						message: "Đăng kí thành công!",
						type: typeNotification.success,
					}),
				)

				dispatch(clearForm())
			})
			.catch((err) => {
				let message = err.message || "Error!"
				const data = err.data
				if (Object.keys(data).length != 0) {
					message = `${data.field} : ${data.message}`
				}
				dispatch(
					notify({
						message,
						type: typeNotification.error,
					}),
				)
				console.log(err)
			})
	}

	return (
		<Card>
			<Card.Body>
				<BaseInput
					minLength={6}
					maxLength={20}
					name="userName"
					regex={/^[a-zA-Z0-9]+$/}
					allowSpaces={false}
					contentLeft={<i className="fa-solid fa-user"></i>}
					placeholder="Username"
					action={setUserName}
				/>

				<BaseInput
					className="form-phoneNumber"
					name="phoneNumber"
					type="number"
					length={10}
					contentLeft={
						<Text span size="$sm">
							{country.value}
						</Text>
					}
					contentLeftStyling={false}
					labelLeft={<PopoverSelect />}
					placeholder=""
					action={setPhoneNumber}
				/>

				<BaseInput
					type="email"
					name="email"
					contentLeft={<i className="fa-solid fa-envelope"></i>}
					placeholder="Email"
					action={setEmail}
				/>

				<BaseInput
					type="password"
					name="password"
					contentLeft={<i className="fa-solid fa-lock-alt"></i>}
					placeholder="Password"
					minLength={8}
					action={setPassword}
				/>

				<BaseInput
					type="password"
					name="confirmPassword"
					contentLeft={<i className="fa-solid fa-lock-alt"></i>}
					placeholder="Confirm Password"
					minLength={8}
					action={setConfirmPassword}
				/>

				<InputVerifyCode lenght={6} />

				<Spacer y={0.5} />

				<Button onClick={submitForm} disabled={!checkValidateAll}>
					Register
				</Button>

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
