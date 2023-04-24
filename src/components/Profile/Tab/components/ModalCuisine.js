import React, { useState } from "react"
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"

export default function ModalCuisine({ onSubmit }) {
	const [visible, setVisible] = React.useState(false)
	const handler = () => setVisible(true)

	const [input, setInput] = useState("")
	const [hideErr, setHideErr] = useState(true)

	const closeHandler = () => {
		setVisible(false)
	}
	const handlerInput = (ev) => {
		setInput(ev.target.value)
	}
	const handlerSubmit = () => {
		if (!input.trim()) {
			setHideErr(false)
			return
		}

		setHideErr(true)

		onSubmit({
			type: "cuisine",
			value: input,
		})
		setInput("")
		setVisible(false)
	}

	return (
		<div>
			<Button auto bordered rounded onPress={handler}>
				<i class="fa-regular fa-plus"></i>
			</Button>
			<Modal
				closeButton
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
			>
				<Modal.Header>
					<Text id="modal-title" size={18}>
						Add new Cuisine
					</Text>
				</Modal.Header>
				<Modal.Body>
					<Input
						name="cuisine"
						placeholder="Cuisine name....."
						onChange={handlerInput}
						value={input}
					/>
					<ValidInput
						message={"Không được để trống"}
						hidden={hideErr}
						isValid={false}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button auto flat color="error" onPress={closeHandler}>
						Close
					</Button>
					<Button auto onPress={handlerSubmit}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
