import classNames from "classnames/bind"
import styles from "./chat.module.css"

import SendMessage from "./SendMessage"
import MessageItem from "./MessageItem"
const cx = classNames.bind(styles)

function BoxChat({ info }) {
	const { type, name, memberChats, boxchatId } = info
	const userId = memberChats[0].userId

	let chatName = ""
	switch (type) {
		case "Normal":
			chatName = memberChats[0].fullName
			break
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
				<div className={cx("boxchat-show-message")}>
					<MessageItem />
					<MessageItem isYourself={true} />
				</div>
				<div className={cx("boxchat-form")}>
					<div className={cx("boxchat-media")}></div>
					<SendMessage />
				</div>
			</div>
		</div>
	)
}

export default BoxChat
