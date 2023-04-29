import classNames from "classnames/bind"
import { useEffect, useState, useContext, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { Button } from "@nextui-org/react"
import styles from "./chat.module.css"
import Textarea from "./Textarea"

import { ConnectionHubContext } from "../ConnectionHub/ConnectionHub"
import { TaskNames } from "@/services/chatHubService"
const cx = classNames.bind(styles)

function SendMessage({ sendMessageTo }) {
	const boxChat = useSelector((state) => state.boxChat)

	const [message, setMessage] = useState("")
	const { connectionHub } = useContext(ConnectionHubContext)

	const sendMessage = () => {
		if (message.trim()) {
			sendMessageTo(boxChat.boxChatId, message)
		}
		setMessage("")
	}

	const handleTextMessage = (ev) => {
		const el = ev.target
		el.style.height = !!el.value ? el.scrollHeight + "px" : "24px"
		setMessage(ev.target.value)
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
					onInput={handleTextMessage}
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
