import classNames from "classnames/bind"
import { useEffect, useState, useContext, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import React from "react"
import { Button } from "@nextui-org/react"
import styles from "./chat.module.css"
import Textarea from "./Textarea"

const cx = classNames.bind(styles)

function SendMessage({ sendMessageTo }) {
	const boxChat = useSelector((state) => state.boxChat)

	const [message, setMessage] = useState("")

	const sendMessage = (react = false) => {
		if (react) {
			sendMessageTo(boxChat.boxchatId, react, (isSuccess) => {
				if (isSuccess) {
					setMessage("")
				}
			})
		} else if (message.trim()) {
			sendMessageTo(boxChat.boxchatId, message, (isSuccess) => {
				if (isSuccess) {
					setMessage("")
				} else {
					console.log("error")
				}
			})
		}
	}

	const handleTextMessage = (ev) => {
		const el = ev.target
		el.style.height = !!el.value ? el.scrollHeight + "px" : "24px"
		setMessage(ev.target.value)
	}

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
							onClick={() => {
								sendMessage()
							}}
						></Button>
					) : (
						<Button
							tabIndex={-1}
							color="#cfd2d5"
							auto
							icon={<i className="fa-solid fa-thumbs-up"></i>}
							onClick={() => {
								sendMessage(`<i class="fa-solid fa-thumbs-up"></i>`)
							}}
							light
						></Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default SendMessage
