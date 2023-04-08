import { Input } from "@nextui-org/react"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"
import { useDispatch, useSelector } from "react-redux"
import { useRef } from "react"

function BaseInput({
	name,
	regex = null,
	type = "text",
	minLength = 0,
	maxLength = 100,
	length = null,
	allowSpaces = true,
	contentLeft,
	contentRight,
	placeholder = "",
	action,
}) {
	const input = useRef(0)
	const formRegister = useSelector((state) => state.formRegister)
	const stateInfo = formRegister[name]

	const dispatch = useDispatch()

	const handlerValue = (ev) => {
		let currentValueInput = ev.target.value

		let valueInput = allowSpaces
			? currentValueInput
			: currentValueInput.replace(" ", "")
		valueInput =
			type === "number"
				? currentValueInput.replace(/[^\d]/g, "")
				: currentValueInput

		if (!valueInput) {
			dispatch(
				action({
					value: valueInput,
					isValidate: false,
					info: name ? `${name} not be empty` : "Not be empty",
					showInfo: true,
					stateName: name,
				}),
			)
		} else if (length && valueInput.length != length) {
			dispatch(
				action({
					value: valueInput,
					isValidate: false,
					info: `${name} có độ dài là ${length}.`,
					showInfo: true,
					stateName: name,
				}),
			)
		} else if (valueInput.length < minLength) {
			dispatch(
				action({
					value: valueInput,
					isValidate: false,
					info: `Minimum length is ${minLength}.`,
					showInfo: true,
					stateName: name,
				}),
			)
		} else if (valueInput.length > maxLength) {
			dispatch(
				action({
					value: valueInput,
					isValidate: false,
					info: `Maximum length is ${maxLength}.`,
					showInfo: true,
					stateName: name,
				}),
			)
		} else if (regex && !regex.test(valueInput)) {
			dispatch(
				action({
					value: valueInput,
					isValidate: false,
					info: name ? `${name} không đúng định dạng` : "Không đúng định dạng",
					showInfo: true,
					stateName: name,
				}),
			)
		} else if (
			type === "email" &&
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valueInput)
		) {
			dispatch(
				action({
					value: valueInput,
					isValidate: false,
					info: `Email không đúng định dạng`,
					showInfo: true,
					stateName: name,
				}),
			)
		} else if (type === "password" && valueInput.search(" ") !== -1) {
			dispatch(
				action({
					value: valueInput,
					isValidate: false,
					info: name ? `${name} không chứa dấu cách` : "Không chứa dấu cách",
					showInfo: true,
					stateName: name,
				}),
			)
		} else {
			dispatch(
				action({
					value: valueInput,
					isValidate: true,
					info: "OK!",
					showInfo: false,
					stateName: name,
				}),
			)
		}
	}

	return (
		<>
			{type == "password" && (
				<>
					<Input.Password
						underlined
						contentLeft={contentLeft}
						placeholder={placeholder}
						onChange={handlerValue}
						value={stateInfo.value}
						minLength={8}
						ref={input}
					/>
					<ValidInput
						message={stateInfo.info}
						hidden={!stateInfo.showInfo}
						isValid={stateInfo.isValidate}
					/>
				</>
			)}
			{type !== "password" && (
				<>
					<Input
						underlined
						contentLeft={contentLeft}
						contentRight={contentRight}
						placeholder={placeholder}
						onChange={handlerValue}
						value={stateInfo.value}
						ref={input}
					/>
					<ValidInput
						message={stateInfo.info}
						hidden={!stateInfo.showInfo}
						isValid={stateInfo.isValidate}
					/>
				</>
			)}
		</>
	)
}

export default BaseInput
