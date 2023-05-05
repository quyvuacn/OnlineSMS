import classNames from "classnames/bind"
import styles from "./chat.module.css"
import { useEffect, useState, useContext, useRef } from "react"
import { getCookies } from "cookies-next"
import SendMessage from "./SendMessage"
import { useDispatch, useSelector } from "react-redux"
import { TaskNames } from "@/services/chatHubService"
import { ConnectionHubContext } from "../ConnectionHub/ConnectionHub"
import ListMessageItem from "./ListMessageItem"
import { notify } from "@/redux/reducers/notificationSlice"
import typeNotification from "@/common/typeNotification"
import { Button } from "@nextui-org/react"
import VideoCall from "./Contact/VideoCall"
import Call from "./Contact/Call"
const cx = classNames.bind(styles)

function BoxChat({ info }) {
	const userId = getCookies()["userId"]

	const { connectionHub } = useContext(ConnectionHubContext)

	const { type, name, memberChats, boxchatId } = info

	const boxchat = useRef()

	const dispatch = useDispatch()

	let chatName = ""
	let avatar = memberChats.find((m) => m.userId != userId).avatar
	switch (type) {
		case "Normal":
			chatName = memberChats.find((m) => m.userId != userId).fullName
			break
	}

	useEffect(() => {
		const el = boxchat.current
		el.scrollTo(0, boxchat.current.scrollTop)
	})

	const sendMessageTo = (boxchatId, message, callback) => {
		const data = {
			boxchatId: boxchatId,
			dataMessage: message,
		}

		connectionHub.invoke(TaskNames.SendMessageTo, data, function (isSuccess) {
			if (typeof callback === "function") {
				callback(isSuccess)
			}
			if (!isSuccess) {
				dispatch(
					notify({
						message: "Tin nhắn chưa được gửi",
						type: typeNotification.error,
					}),
				)
			}
		})
	}

	return (
		<div className={cx("boxchat-wrap")}>
			<div className={cx("boxchat-header")}>
				<div style={{ display: "flex" }}>
					<div className={cx("boxchat-logo")}>
						<img src={avatar ?? "/images/default-avatar.png"} alt="" />
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

				<div className={cx("call")}>
					<VideoCall />
					<Call />
				</div>
			</div>
			<div className={cx("boxchat-main")}>
				<div className={cx("boxchat-show-message")} ref={boxchat}>
					<ListMessageItem boxchatId={boxchatId} />
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
