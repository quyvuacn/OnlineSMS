import { Card, Text, Input, Button, Spacer } from "@nextui-org/react"
import SendButton from "@/customizeNextUI/nextui-org/SendButton"
import Link from "@/customizeNextUI/nextui-org/Link"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"

function FormLogin() {
	return (
		<Card>
			<Card.Body>
				<Input
					underlined
					contentLeft={<i className="fa-solid fa-mobile"></i>}
					placeholder="Phone Number"
					initialValue=""
				/>
				<ValidInput message="Số điện thoại không hợp lệ" />

				<Input.Password
					underlined
					contentLeft={<i className="fa-solid fa-lock-alt"></i>}
					placeholder="Password"
					initialValue=""
				/>
				<ValidInput message="Số điện thoại không hợp lệ" hidden={false} />

				<Input
					underlined
					contentLeft={<i className="fa-sharp fa-solid fa-shield-check"></i>}
					placeholder="Send code"
					initialValue=""
					contentRight={
						<SendButton>
							<i className="fa-solid fa-paper-plane-top"></i>
						</SendButton>
					}
					contentRightStyling={false}
				/>
				<ValidInput message="Số điện thoại không hợp lệ" />

				{/* <Text span size="$xs">
      Gửi lại code sau : 20s
    </Text>
    <Link href="javascript:void(0)">
      <Text span size="$xs" color="primary">
        Send code
      </Text>
    </Link> */}

				<Spacer y={1} />

				<Button>Login</Button>
				<Spacer y={0.5} />
				<div style={{ display: "flex" }}>
					<Link
						href={"/register"}
						css={{ margin: "0 auto", color: "gray", fontSize: "14px" }}
					>
						Register
					</Link>
					<Link
						href={"/register"}
						css={{ margin: "0 auto", color: "gray", fontSize: "14px" }}
					>
						Forgot password ?
					</Link>
				</div>
			</Card.Body>
		</Card>
	)
}

export default FormLogin
