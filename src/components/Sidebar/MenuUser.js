import Button from "@/customizeNextUI/nextui-org/Button"
import {
	Card,
	Grid,
	Text,
	Row,
	Link,
	Dropdown,
	NavbarLink,
} from "@nextui-org/react"

function MenuUser() {
	return (
		<Card css={{ mw: "330px" }} shadow>
			<Card.Header>
				<Text b>Quý Vũ</Text>
			</Card.Header>
			<Card.Divider />
			<Card.Body css={{ py: "$10" }}>
				<Text>
					Some quick example text to build on the card title and make up the
					bulk of the card's content.
				</Text>
			</Card.Body>
			<Card.Divider />

			<Card.Footer>
				<Button href="/profile">Hồ sơ</Button>
			</Card.Footer>
		</Card>
	)
}

export default MenuUser
