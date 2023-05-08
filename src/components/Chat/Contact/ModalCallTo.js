import { ConnectionHubContext } from "@/components/ConnectionHub/ConnectionHub"
import { Modal, useModal, Button, Text, Avatar } from "@nextui-org/react"
import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import classNames from "classnames/bind"

import styles from "./contact.module.css"
import { TaskNames } from "@/services/chatHubService"
import { setCallinng } from "@/redux/reducers/callingSlice"

const cx = classNames.bind(styles)

function ModalCallTo({ isShow, hideModalCallTo }) {
	const { boxChats, connectionHub } = useContext(ConnectionHubContext)
	const calling = useSelector((state) => state.calling)
	const infoCall = boxChats?.find(
		(chat) => chat.boxchatId == calling?.boxchatId,
	)
	const [pickUp, setPickUp] = useState(false)

	useEffect(() => {
		const boxchatId = calling.boxchatId

		const data = {
			boxchatId,
		}

		const invokeCancel = () => {
			connectionHub.invoke(TaskNames.Cancel, data, function (done) {
				console.log("Canceled")
				hideModalCallTo()
			})
		}
		setTimeout(invokeCancel, 30 * 1000)
		if (pickUp) {
			clearTimeout(invokeCancel)
		}
		return () => {
			clearTimeout(invokeCancel)
		}
	}, [pickUp])

	let avatar = ""
	let name = ""

	if (infoCall?.type == "Normal") {
		avatar = calling.userAvatar || "/images/default-avatar.png"
		name = calling.userSendFullName
	}

	const actionPickUp = () => {
		const boxchatId = calling.boxchatId
		setPickUp(true)
		hideModalCallTo()
		window.open(`/call/${boxchatId}?type=join`, "_blank")
	}
	const actionRefuse = () => {
		console.log("Canceling ....")

		const boxchatId = calling.boxchatId

		const data = {
			boxchatId,
		}
		connectionHub.invoke(TaskNames.Cancel, data, function (done) {
			console.log("Canceled")

			hideModalCallTo()
		})
	}

	return (
		<div>
			<Modal open={isShow} onClose={hideModalCallTo}>
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
							<Button flat auto color="error" onClick={actionRefuse}>
								<i class="fa-regular fa-phone-slash"></i>
							</Button>
							<Button flat auto color="primary" onClick={actionPickUp}>
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
