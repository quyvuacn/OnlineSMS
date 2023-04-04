import { Input } from "@nextui-org/react"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"

function InputPhoneNumber() {
	return (
		<>
			<Input.Password
				underlined
				contentLeft={<i className="fa-solid fa-lock-alt"></i>}
				placeholder="Password"
				initialValue=""
			/>
			<ValidInput message="Số điện thoại không hợp lệ" hidden={false} />
		</>
	)
}

export default InputPhoneNumber
