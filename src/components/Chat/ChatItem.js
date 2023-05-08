import { getCookies } from "cookies-next"
import classNames from "classnames/bind"
import styles from "./chat.module.css"
import { Badge } from "@nextui-org/react"
const cx = classNames.bind(styles)

function ChatItem({ info, handleBoxChatId, presentBoxChatId }) {
	const userId = getCookies()["userId"]
	let {
		type,
		name,
		memberChats,
		boxchatId,
		lastMessageContent,
		lastUserSendFullName,
		lastUserSendId,
		unreadMessages,
	} = info

	let chatName = ""
	let avatar = memberChats.find((m) => m.userId != userId).avatar

	switch (type) {
		case "Normal":
			chatName = memberChats.find((m) => m.userId != userId).fullName
			if (lastUserSendId) {
				lastMessageContent =
					(userId == lastUserSendId ? "You" : lastUserSendFullName) +
					" : " +
					lastMessageContent
			} else {
				lastMessageContent = `Các bạn đã là bạn bè! Hãy gửi lời chào đến ${chatName}`
			}
			break
		case "Group":
			chatName = name
			avatar = info.avatar
			if (lastUserSendId) {
				lastMessageContent =
					(userId == lastUserSendId ? "You" : lastUserSendFullName) +
					" : " +
					lastMessageContent
			} else {
				lastMessageContent = `Nhóm đã được tạo! Hãy gửi lời chào đến nhóm`
			}
			break
	}

	return (
		<div
			className={cx("wrap", { active: boxchatId == presentBoxChatId })}
			onClick={() => {
				handleBoxChatId(boxchatId)
			}}
		>
			<div className={cx("logo")}>
				<img src={avatar ?? "/images/default-avatar.png"} alt="" />
			</div>
			<div className={cx("content")}>
				<div className={cx("title")}>
					{chatName}
					{unreadMessages > 0 && <Badge color="error" variant="dot" />}
				</div>
				<div
					className={cx("message")}
					dangerouslySetInnerHTML={{ __html: lastMessageContent }}
				></div>
			</div>
		</div>
	)
}

export default ChatItem
