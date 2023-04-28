import classNames from "classnames/bind"
import styles from "./chat.module.css"
const cx = classNames.bind(styles)

function ChatItem({ info, handleBoxChatId, presentBoxChatId }) {
	const { type, name, memberChats, boxchatId } = info
	let chatName = ""
	let lastMessage = ""
	switch (type) {
		case "Normal":
			chatName = memberChats[0].fullName
			lastMessage = `Các bạn đã là bạn bè! Hãy gửi lời chào đến ${chatName}`
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
				<img src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="" />
			</div>
			<div className={cx("content")}>
				<div className={cx("title")}>{chatName}</div>
				<div className={cx("message")}>{lastMessage}</div>
			</div>
		</div>
	)
}

export default ChatItem
