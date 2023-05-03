import Button from "@/customizeNextUI/nextui-org/Button"
import { Card, Text } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"

function MenuUser({ setOpen }) {
	const user = useSelector((state) => state.user)

	return (
		<Card css={{ w: "280px" }} shadow>
			<Card.Header>
				<Text b>{user.fullName ?? "You"}</Text>
			</Card.Header>
			<Card.Divider />
			<Card.Body css={{ py: "$5" }}>
				<Button
					onClick={() => {
						setOpen(false)
					}}
					light
					href="/profile"
					style={{ width: "100%", justifyContent: "left" }}
					size="sm"
				>
					Hồ sơ của bạn
				</Button>
				<Button
					onClick={() => {
						setOpen(false)
					}}
					light
					style={{ width: "100%", justifyContent: "left" }}
					size="sm"
				>
					Cài đặt
				</Button>
			</Card.Body>
			<Card.Divider />

			<Card.Footer>
				<Button
					onClick={() => {
						setOpen(false)
					}}
					light
					href="/logout"
					style={{ width: "100%", justifyContent: "left" }}
					size="sm"
					color="error"
				>
					Đăng xuất
				</Button>
			</Card.Footer>
		</Card>
	)
}

export default MenuUser
