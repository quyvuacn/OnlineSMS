import { Card, Button, Spacer } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"

import Link from "@/customizeNextUI/nextui-org/Link"

import BaseInput from "./Input/BaseInput"
import InputVerifyCode from "./Input/InputVerifyCode"
import {
	setUserName,
	setPhoneNumber,
	setEmail,
	setPassword,
	setConfirmPassword,
} from "@/redux/actions/actionFormRegister"
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
	const dispatch = useDispatch()
	const router = useRouter()

	console.log(notification)

	const checkValidateAll = (() => {
		for (let stateItemKey in formRegister) {
			if (stateItemKey == "verifyCode" || stateItemKey == "validateAll")
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
		const data = {
			userName: formRegister["userName"].value,
			email: formRegister["email"].value,
			phoneNumber: formRegister["phoneNumber"].value,
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
			})
			.catch((err) => {
				const message = err.message || "Error!"
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
					name="phoneNumber"
					type="number"
					length={11}
					contentLeft={<i className="fa-solid fa-mobile"></i>}
					placeholder="Phone Number"
					action={setPhoneNumber}
				/>

				<BaseInput
					type="email"
					name="email"
					contentLeft={<i class="fa-solid fa-envelope"></i>}
					placeholder="Email"
					action={setEmail}
				/>

				<BaseInput
					type="password"
					name="password"
					contentLeft={<i className="fa-solid fa-lock-alt"></i>}
					placeholder="Password"
					minLength={10}
					action={setPassword}
				/>

				<BaseInput
					type="password"
					name="confirmPassword"
					contentLeft={<i className="fa-solid fa-lock-alt"></i>}
					placeholder="Confirm Password"
					minLength={10}
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
