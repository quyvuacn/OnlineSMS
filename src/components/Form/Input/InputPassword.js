import { Input } from "@nextui-org/react"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"

function InputPassword() {
	return (
		<>
			<Input.Password
				placeholder="Confirm Password"
				underlined
				contentLeft={<i className="fa-solid fa-lock-alt"></i>}
				onChange={handlerPassword}
				value={password}
			/>
			<ValidInput message="Số điện thoại không hợp lệ" hidden={false} />
		</>
	)
}

export default InputPassword
