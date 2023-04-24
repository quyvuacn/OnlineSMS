import parsePhoneNumber from "libphonenumber-js"
import { Card, Button, Spacer, Text } from "@nextui-org/react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"
import { useDispatch, useSelector } from "react-redux"
import Link from "@/customizeNextUI/nextui-org/Link"

import BaseInput from "./Input/BaseInput"
import PopoverSelect from "./Input/PopoverSelect"
import InputVerifyCode from "./Input/InputVerifyCode"

import { setPhoneNumber, setPassword } from "@/redux/actions/actionFormRegister"
import { AuthAPI } from "@/api/authApi"
import { useRouter } from "next/router"
import { notify } from "@/redux/reducers/notificationSlice"
import typeNotification from "@/common/typeNotification"
import { clearForm } from "@/redux/reducers/formRegisterSlice"

function FormLogin() {
	const formRegister = useSelector((state) => state.formRegister)
	const country = formRegister["country"]

	const dispatch = useDispatch()
	const router = useRouter()

	const checkValidateAll =
		formRegister["phoneNumber"].isValidate &&
		formRegister["password"].isValidate

	const submitForm = () => {
		const phoneNumber = formRegister.phoneNumber.value
		const countryCode = formRegister.country.value

		const phoneNumberFormat = parsePhoneNumber(
			`${countryCode} ${phoneNumber}`,
		).number

		const data = {
			phoneNumber: phoneNumberFormat,
			password: formRegister["password"].value,
		}

		AuthAPI.login(data)
			.then(({ data }) => {
				dispatch(clearForm())
				setCookie("token", data.token)
				router.push("/chat")
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
					type="password"
					name="password"
					contentLeft={<i className="fa-solid fa-lock-alt"></i>}
					placeholder="Password"
					minLength={8}
					action={setPassword}
				/>

				<Spacer y={0.5} />

				<Button onClick={submitForm} disabled={!checkValidateAll}>
					Login
				</Button>
				<Spacer y={0.5} />
				<div style={{ display: "flex" }}>
					<Link
						href={"/register"}
						css={{ margin: "0 auto", color: "gray", fontSize: "14px" }}
					>
						Register
					</Link>
					<Link
						href={"/register"}
						css={{ margin: "0 auto", color: "gray", fontSize: "14px" }}
					>
						Forgot password ?
					</Link>
				</div>
			</Card.Body>
		</Card>
	)
}

export default FormLogin
