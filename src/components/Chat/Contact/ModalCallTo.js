import { ConnectionHubContext } from "@/components/ConnectionHub/ConnectionHub"
import { Modal, useModal, Button, Text, Avatar } from "@nextui-org/react"
import { useEffect, useState, useContext } from "react"
import { useSelector } from "react-redux"
import classNames from "classnames/bind"

import styles from "./contact.module.css"
import { TaskNames } from "@/services/chatHubService"

const cx = classNames.bind(styles)

function ModalCallTo({ isShow, hideModalCallTo }) {
	const { boxChats } = useContext(ConnectionHubContext)
	const calling = useSelector((state) => state.calling)
	const infoCall = boxChats?.find(
		(chat) => chat.boxchatId == calling?.boxchatId,
	)

	let avatar = ""
	let name = ""

	if (infoCall?.type == "Normal") {
		avatar = calling.userAvatar || "/images/default-avatar.png"
		name = calling.userSendFullName
	}

	const pickUp = () => {
		const boxchatId = calling.boxchatId
		hideModalCallTo()
		window.open(`/call/${boxchatId}?type=join`, "_blank")
	}
	const refuse = () => {
		hideModalCallTo()
		console.log("ok")
	}
	return (
		<div>
			<Modal open={isShow}>
				<Modal.Header>
					<Text>Cuộc gọi từ</Text>
				</Modal.Header>
				<Modal.Body>
					<div className={cx("wrap")}>
						<Avatar
							width={48}
							height={48}
							size="lg"
							css={{ border: "1px solid #fff" }}
							src={avatar}
							tabIndex={-1}
						/>
						<Text>{name}</Text>
						<div className={cx("action")}>
							<Button flat auto color="error" onClick={refuse}>
								<i class="fa-regular fa-phone-slash"></i>
							</Button>
							<Button flat auto color="primary" onClick={pickUp}>
								<i class="fa-regular fa-phone-flip"></i>
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default ModalCallTo
