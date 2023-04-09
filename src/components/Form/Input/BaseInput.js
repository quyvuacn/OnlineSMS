import { Input } from "@nextui-org/react"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState, useLayoutEffect } from "react"
import classNames from "classnames/bind"
import styles from ".././form.module.css"
import { useBinding } from "@/hooks/useBinding"
const cx = classNames.bind(styles)

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
	labelLeft,
	className,
}) {
	const formRegister = useSelector((state) => state.formRegister)
	const stateInfo = formRegister[name]

	const dispatch = useDispatch()
	const ref = useRef()

	const handlerValue = (ev) => {
		let valueInput = ev.target.value
		const keyPress = ev.nativeEvent.data

		if (keyPress) {
			if (!allowSpaces && keyPress == " ") return
			if (type === "number" && !/\d/.test(keyPress)) return
		}

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
						className={className}
						underlined
						contentLeft={contentLeft}
						placeholder={placeholder}
						onInput={handlerValue}
						value={stateInfo.value}
						minLength={8}
						ref={ref}
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
						className={className}
						underlined
						labelLeft={labelLeft}
						contentLeft={contentLeft}
						contentRight={contentRight}
						placeholder={placeholder}
						onInput={handlerValue}
						value={stateInfo.value}
						ref={ref}
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
