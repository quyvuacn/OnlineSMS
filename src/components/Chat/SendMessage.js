import classNames from "classnames/bind"
import { useEffect, useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { Button } from "@nextui-org/react"
import styles from "./chat.module.css"
import Textarea from "./Textarea"

import { ConnectionHubContext } from "../ConnectionHub/ConnectionHub"
import { TaskNames } from "@/services/chatHubService"
const cx = classNames.bind(styles)

function SendMessage() {
	const boxChat = useSelector((state) => state.boxChat)

	const [message, setMessage] = useState("")
	const { connectionHub } = useContext(ConnectionHubContext)

	const sendMessage = () => {
		if (!message.trim()) {
			setMessage("")
		} else {
			const data = {
				boxChatId: boxChat.boxChatId,
				dataMessage: "Vũ Viết Quý",
			}
			connectionHub.invoke(TaskNames.SendMessageTo, data, function (isSuccess) {
				console.log(isSuccess)
			})
		}
	}

	useEffect(() => {
		if (connectionHub) {
			connectionHub.on(TaskNames.ListenMesage, function (data) {
				console.log(data)
			})
		}
		return () => {
			connectionHub.off(TaskNames.ListenMesage)
		}
	}, [connectionHub])

	return (
		<div className={cx("send-message")}>
			<div className={cx("send-more-top")}></div>
			<div className={cx("textarea-wrap")}>
				<Textarea
					className={cx("textarea")}
					onChange={(ev) => {
						setMessage(ev.target.value)
					}}
					message={message}
					rows={1}
					placeholder="Nhập tin nhắn ....."
				/>
				<div className={cx("send-more-right")}>
					<Button
						tabIndex={-1}
						color="#cfd2d5"
						auto
						icon={<i className="fa-regular fa-face-laugh-wink"></i>}
						light
					></Button>
					{message ? (
						<Button
							tabIndex={-1}
							color="#cfd2d5"
							auto
							icon={<i className="fa-solid fa-paper-plane-top"></i>}
							light
							onClick={sendMessage}
						></Button>
					) : (
						<Button
							tabIndex={-1}
							color="#cfd2d5"
							auto
							icon={<i className="fa-solid fa-thumbs-up"></i>}
							light
						></Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default SendMessage
