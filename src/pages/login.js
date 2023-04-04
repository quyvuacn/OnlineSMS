import classNames from "classnames/bind"
import styles from "@/styles/login.module.css"
import { Card, Text, Input, Button, Spacer } from "@nextui-org/react"
import Link from "@/customizeNextUI/nextui-org/Link"
import SendButton from "@/customizeNextUI/nextui-org/SendButton"
import FormLogin from "@/components/Form/FormLogin"
const cx = classNames.bind(styles)

function Login() {
	return (
		<div className={cx("wrap")}>
			<div className={cx("content")}>
				<div className={cx("logo")}>
					<img src="/images/zlogo.png" alt="" />
				</div>
				<Spacer y={1} />
				<Text h4 css={{ textAlign: "center", fontWeight: 400 }}>
					Đăng nhập tài khoản Zalo để kết nối với ứng dụng Zalo Web
				</Text>
				<Spacer y={1} />
				<FormLogin />
			</div>
		</div>
	)
}

export default Login

Login.getLayout = function getLayout(content) {
	return <>{content}</>
}
