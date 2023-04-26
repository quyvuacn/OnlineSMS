import Button from "@/customizeNextUI/nextui-org/Button"
import { Card, Text } from "@nextui-org/react"

function MenuUser({ setOpen }) {
	return (
		<Card css={{ w: "280px" }} shadow>
			<Card.Header>
				<Text b>Quý Vũ</Text>
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
