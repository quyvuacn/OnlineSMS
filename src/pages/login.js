import classNames from "classnames/bind"
import styles from "@/styles/login.module.css"
import {
	Card,
	Text,
	Input,
	Button,
	Spacer,
	SendButton,
	SendIcon,
} from "@nextui-org/react"
import Link from "@/customizeNextUI/nextui-org/Link"
const cx = classNames.bind(styles)

function Login() {
	return (
		<div className={cx("wrap")}>
			<div className={cx("content")}>
				<Text h4 css={{ textAlign: "center" }}>
					Đăng nhập tài khoản Zalo
				</Text>
				<Card>
					<Card.Body>
						<Input
							underlined
							contentLeft={<i className="fa-solid fa-mobile"></i>}
							placeholder="Phone Number"
							initialValue=""
						/>
						<Spacer y={1} />

						<Input.Password
							underlined
							contentLeft={<i className="fa-solid fa-lock-alt"></i>}
							placeholder="Password"
							initialValue=""
						/>
						<Spacer y={1} />

						<Input
							underlined
							contentLeft={<i class="fa-sharp fa-solid fa-shield-check"></i>}
							placeholder="Send code"
							initialValue=""
							contentRight={
								<SendButton>
									<SendIcon />
								</SendButton>
							}
						/>
						<Spacer y={1} />

						<Button>Login</Button>
						<Spacer y={0.5} />
						<Link
							href={"/register"}
							css={{ margin: "0 auto", color: "gray", fontSize: "14px" }}
						>
							Register
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
