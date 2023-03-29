import classNames from "classnames/bind"
import styles from "./chat.module.css"
const cx = classNames.bind(styles)

function ChatItem({
	logo,
	boxChatName,
	lastMessage = { userName: null, message: null },
	active = false,
	boxChatId = 1,
	onClick
}) {
	return (
		<div  className={cx("wrap",{ active  })} onClick={(ev)=>{onClick(ev)}}>
			<div className={cx("logo")}>
				<img src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="" />
			</div>
			<div className={cx("content")}>
				<div className={cx("title")}>
					Quý Vũ
					<span className={cx("time")}>20/12/2023</span>
				</div>
				<div className={cx("message")}>Tin nhắn bị thu hồiTin nhắn bị thu hồiTin nhắn bị thu hồi</div>
			</div>
		</div>
	)
}

export default ChatItem
