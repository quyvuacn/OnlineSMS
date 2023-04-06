import { useEffect, useState } from "react"
import { Input, Text, Loading } from "@nextui-org/react"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"
import SendButton from "@/customizeNextUI/nextui-org/SendButton"

function InputVerifyCode({ lenght, showBtnSendSMS, onSendSMS }) {
	console.log(showBtnSendSMS)
	const [verifycode, setVerifycode] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [placeholder, setPlaceholder] = useState("Verify phone number")
	const [icon, setIcon] = useState(
		<i
			className="fa-solid fa-paper-plane-top"
			style={{ color: "#0072F5" }}
		></i>,
	)
	const handlerVerifycode = (ev) => {
		setVerifycode(ev.target.value.replace(/\D/, ""))
	}

	const handlerLoading = () => {
		if (!isLoading && showBtnSendSMS) {
			setIsLoading(true)
			setIcon(<Loading size="xs" />)
			setPlaceholder("Verifying phone number")
			onSendSMS()
		}
	}

	useEffect(() => {}, [isLoading])

	return (
		<>
			<Input
				underlined
				contentLeft={<i className="fa-sharp fa-solid fa-shield-check"></i>}
				placeholder={placeholder}
				onChange={handlerVerifycode}
				value={verifycode}
				contentRight={
					showBtnSendSMS && (
						<SendButton onClick={handlerLoading}>{icon}</SendButton>
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
