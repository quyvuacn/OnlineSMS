import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react"
import { useState } from "react"

function AddFriend() {
	const [visible, setVisible] = useState(false)
	const handler = () => setVisible(true)

	const closeHandler = () => {
		setVisible(false)
	}

	return (
		<>
			<Button
				tabIndex={-1}
				color="#cfd2d5"
				auto
				icon={<i class="fa-light fa-user-plus"></i>}
				light
				onPress={handler}
			></Button>

			<Modal
				style={{ animationDuration: "500ms" }}
				closeButton
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
			>
				<Modal.Body>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default AddFriend
