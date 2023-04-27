import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import React from "react"
import { Button } from "@nextui-org/react"
import styles from "./chat.module.css"
import Textarea from "./Textarea"

import { ConnectionHubContext } from "../ConnectionHub/ConnectionHub"
const cx = classNames.bind(styles)

function SendMessage() {
	const [message, setMessage] = useState("")
	const { connectionHub } = React.useContext(ConnectionHubContext)

	const sendMessage = () => {
		connectionHub
			.invoke(
				"Hello",
				connectionHub.connectionId,
				"Đây là 1 tin nhắn" + Date.now().toString(),
			)
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		if (connectionHub) {
			connectionHub.on("Hello", (connectionId, message) => {
				console.log(`${connectionId}: ${message}`)
			})
		}
		return () => {
			connectionHub?.off("Hello")
		}
	}, [connectionHub])

	return (
		<div className={cx("send-message")}>
			<div className={cx("send-more-top")}></div>
			<div className={cx("textarea-wrap")}>
				<Textarea
					className={cx("textarea")}
					onInput={(ev) => {
						setMessage(ev.target.value)
					}}
					value={message}
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
					<Button
						tabIndex={-1}
						color="#cfd2d5"
						auto
						icon={<i className="fa-solid fa-thumbs-up"></i>}
						light
						onClick={sendMessage}
					></Button>
				</div>
			</div>
		</div>
	)
}

export default SendMessage
