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

function FormRegister() {
	// const formRegister = useSelector((state) => state.formRegister)
	// console.log(formRegister)
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
