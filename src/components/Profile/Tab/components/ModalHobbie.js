import React, { useState } from "react"
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react"
import ValidInput from "@/customizeNextUI/nextui-org/ValidInput"

export default function ModalHobbie({ onSubmit }) {
	const [visible, setVisible] = React.useState(false)
	const handler = () => setVisible(true)
	const [hideErr, setHideErr] = useState(true)

	const [input, setInput] = useState("")

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
			type: "hobbie",
			value: input,
		})
		setInput("")
		setVisible(false)
	}

	return (
		<div>
			<Button auto bordered rounded onPress={handler}>
				<i className="fa-regular fa-plus"></i>
			</Button>
			<Modal
				closeButton
				aria-labelledby="modal-title"
				open={visible}
				onClose={closeHandler}
			>
				<Modal.Header>
					<Text id="modal-title" size={18}>
						Add new Hobbie
					</Text>
				</Modal.Header>
				<Modal.Body>
					<Input
						name="hobbie"
						placeholder="Hobbie name....."
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
