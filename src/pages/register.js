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
				<Text h4 css={{ textAlign: "center" }}>
					Đăng kí tài khoản Zalo
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
