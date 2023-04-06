import { Card, Button, Spacer } from "@nextui-org/react"
import Link from "@/customizeNextUI/nextui-org/Link"
import { useState, useEffect } from "react"

import BaseInput from "./Input/BaseInput"
import InputVerifyCode from "./Input/InputVerifyCode"
import { useDispatch, useSelector } from "react-redux"
import {
	setUserName,
	setPhoneNumber,
	setEmail,
	setPassword,
	setConfirmPassword,
	setVerifycode,
} from "@/redux/actions/actionFormRegister"

function FormRegister() {
	const dispatch = useDispatch()
	const formRegister = useSelector((state) => state.formRegister)

	return (
		<Card>
			<Card.Body>
				<BaseInput
					minLength={6}
					maxLength={20}
					name="Username"
					regex={/^[a-zA-Z0-9]+$/}
					allowSpaces={false}
					contentLeft={<i className="fa-solid fa-user"></i>}
					placeholder="Username"
				/>

				<BaseInput
					name="PhoneNumber"
					type="number"
					length={10}
					contentLeft={<i className="fa-solid fa-mobile"></i>}
					placeholder="Phone Number"
				/>

				<BaseInput
					type="email"
					name="Email"
					contentLeft={<i class="fa-solid fa-envelope"></i>}
					placeholder="Email"
				/>

				<BaseInput
					type="password"
					name="Password"
					contentLeft={<i className="fa-solid fa-lock-alt"></i>}
					placeholder="Password"
					minLength={10}
				/>

				<BaseInput
					type="password"
					name="Password"
					contentLeft={<i className="fa-solid fa-lock-alt"></i>}
					placeholder="Confirm Password"
					minLength={10}
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
