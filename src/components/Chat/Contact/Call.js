import { Modal, useModal, Button, Text } from "@nextui-org/react"

export default function Call() {
	const { setVisible, bindings } = useModal()
	return (
		<div>
			<Button
				auto
				light
				icon={<i class="fa-regular fa-video"></i>}
				onPress={() => setVisible(true)}
			></Button>
			<Modal
				scroll
				fullScreen
				closeButton
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
				{...bindings}
			>
				<Modal.Body></Modal.Body>
				<Modal.Footer>
					<Button flat auto color="error" onPress={() => setVisible(false)}>
						Close
					</Button>
					<Button onPress={() => setVisible(false)}>Agree</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
