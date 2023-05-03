import classNames from "classnames/bind"
import styles from "./chat.module.css"
import MessageItem from "./MessageItem"
import { getCookies, setCookie, deleteCookie } from "cookies-next"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const cx = classNames.bind(styles)

function ListMessageItem({ boxchatId }) {
	const userId = getCookies()["userId"]
	const boxChatMessages = useSelector((state) => state.boxChat)

	const listMessage = boxChatMessages[boxchatId]?.listMessage || []
	return (
		<>
			{listMessage.map((message) => {
				return (
					<MessageItem
						isYourself={userId == message.userSendId}
						content={message.content}
						avatar={message.userAvatar}
					/>
				)
			})}
		</>
	)
}

export default ListMessageItem
