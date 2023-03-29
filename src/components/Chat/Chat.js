import classNames from "classnames/bind"
import styles from "./chat.module.css"
const cx = classNames.bind(styles)

function ChatItem({
	logo,
	boxChatName,
	lastMessage = { userName: null, message: null },
}) {
	return (
		<div className={cx("wrap")}>
			<div className={cx("logo")}>
				<img src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="" />
			</div>
			<div className={cx("content")}>
				<div className={cx("title")}>
					Quý Vũ
					<span>20/12/2023</span>
				</div>
				<span className={cx("message")}>Tin nhắn gửi hôm qua</span>
			</div>
		</div>
	)
}

export default ChatItem
