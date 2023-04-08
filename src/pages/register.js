import classNames from "classnames/bind"
import styles from "@/styles/login.module.css"
import { Text, Spacer } from "@nextui-org/react"
import FormRegister from "@/components/Form/FormRegister"
import NoLayout from "@/components/NoLayout"

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
					Đăng kí tài khoản Zalo để kết nối với ứng dụng Zalo Web
				</Text>
				<FormRegister />
			</div>
		</div>
	)
}

export default Login

Login.layout = NoLayout
