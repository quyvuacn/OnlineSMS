import { Input } from "@nextui-org/react"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"

function InputVerifyCode() {
	return (
		<>
			<Input
				underlined
				contentLeft={<i className="fa-sharp fa-solid fa-shield-check"></i>}
				placeholder="Code hết hạn sau 5p"
				onChange={handlerVerifycode}
				value={verifycode}
				contentRight={
					<SendButton>
						<i
							className="fa-solid fa-paper-plane-top"
							style={{ color: "#0072F5" }}
						></i>
					</SendButton>
				}
				contentRightStyling={false}
				minLength={6}
				maxLength={6}
			/>
			<ValidInput message="Số điện thoại không hợp lệ" />

			<Text span size="$xs">
				Gửi lại code sau : 20s
			</Text>
		</>
	)
}

export default InputVerifyCode
