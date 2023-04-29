import classNames from "classnames/bind"
import styles from "./chat.module.css"
import { useEffect, useState, useContext, useRef } from "react"
import SendMessage from "./SendMessage"
import MessageItem from "./MessageItem"
import { TaskNames } from "@/services/chatHubService"
import { ConnectionHubContext } from "../ConnectionHub/ConnectionHub"
import ListMessageItem from "./ListMessageItem"
const cx = classNames.bind(styles)

function BoxChat({ info }) {
	const { connectionHub, crudBoxChatMessages } =
		useContext(ConnectionHubContext)

	const { type, name, memberChats, boxchatId } = info

	const userId = memberChats[0].userId
	const boxchat = useRef()

	const listMessage = crudBoxChatMessages.find(boxchatId)
	console.log(listMessage)
	let chatName = ""
	switch (type) {
		case "Normal":
			chatName = memberChats[0].fullName
			break
	}

	useEffect(() => {
		const el = boxchat.current
		el.scrollTo(0, el.scrollHeight)
	})

	const sendMessageTo = (boxChatId, message) => {
		const data = {
			boxChatId: boxChatId,
			dataMessage: message,
		}
		connectionHub.invoke(TaskNames.SendMessageTo, data, function (isSuccess) {
			console.log(isSuccess)
		})
	}

	return (
		<div className={cx("boxchat-wrap")}>
			<div className={cx("boxchat-header")}>
				<div className={cx("boxchat-logo")}>
					<img src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="" />
				</div>
				<div className={cx("boxchat-title")}>
					<div>
						<div className={cx("title")} style={{ margin: 0 }}>
							<b>{chatName}</b>
						</div>
						<span className={cx("subtitle")}>Truy cập 5 phút trước</span>
					</div>
				</div>
			</div>
			<div className={cx("boxchat-main")}>
				<div className={cx("boxchat-show-message")} ref={boxchat}>
					<ListMessageItem boxChatMessages={[1, 2, 3]} />
				</div>
				<div className={cx("boxchat-form")}>
					<div className={cx("boxchat-media")}></div>
					<SendMessage sendMessageTo={sendMessageTo} />
				</div>
			</div>
		</div>
	)
}

export default BoxChat
