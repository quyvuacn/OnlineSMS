import { useState, useRef, useEffect } from "react"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"

import { Popover, Button, Text } from "@nextui-org/react"
import classNames from "classnames/bind"
import styles from ".././form.module.css"
import SelectCountry from "./SelectCountry"

const cx = classNames.bind(styles)

function PopoverSelect() {
	const formRegister = useSelector((state) => state.formRegister)
	const country = formRegister.country

	const [open, setOpen] = useState(true)

	useEffect(() => {
		setOpen(false)
	}, [country])

	return (
		<Popover
			isOpen={open}
			disableAnimation
			placement="bottom-left"
			offset={0}
			defaultOpen={true}
			shouldCloseOnInteractOutside={() => {
				setOpen(false)
			}}
		>
			<Popover.Trigger>
				<Button
					auto
					light
					css={{ padding: 0, outline: "none", border: "none" }}
					animated={false}
					tabIndex={-1}
					onClick={() => {
						setOpen(true)
					}}
				>
					<Text span size="$xs">
						{country.code}
					</Text>
				</Button>
			</Popover.Trigger>
			<Popover.Content
				css={{ overflow: "revert !important", width: 240, border: "none" }}
			>
				{open && <SelectCountry />}
			</Popover.Content>
		</Popover>
	)
}

export default PopoverSelect
