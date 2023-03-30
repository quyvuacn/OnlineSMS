import classNames from "classnames/bind"
import styles from "@/styles/login.module.css"
import { Card, Text, Input, Button, Spacer } from "@nextui-org/react"
import Register from "./register"
import Link from "@/customizeNextUI/nextui-org/Link"
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
				<Card>
					<Card.Body>
						<Input
							underlined
							contentLeft={<i className="fa-solid fa-user"></i>}
							placeholder="Full name"
						/>
						<Spacer y={1} />

						<Input
							underlined
							contentLeft={<i className="fa-solid fa-mobile"></i>}
							placeholder="Phone Number"
						/>
						<Spacer y={1} />

						<Input.Password
							underlined
							contentLeft={<i className="fa-solid fa-lock-alt"></i>}
							placeholder="Password"
						/>
						<Spacer y={1} />

						<Input.Password
							placeholder="Confirm Password"
							underlined
							contentLeft={<i className="fa-solid fa-lock-alt"></i>}
						/>
						<Spacer y={1} />
						<Input
							underlined
							contentLeft={
								<i className="fa-sharp fa-solid fa-shield-check"></i>
							}
							placeholder="Send code"
							initialValue=""
						/>
						<Spacer y={0.5} />

						<Text span size="$xs">
							Gửi lại code sau : 20s
						</Text>
						<Link href="javascript:void(0)">
							<Text span size="$xs" color="primary">
								Send code
							</Text>
						</Link>
						<Spacer y={1} />
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
			</div>
		</div>
	)
}

export default Login

Login.getLayout = function getLayout(content) {
	return <>{content}</>
}
