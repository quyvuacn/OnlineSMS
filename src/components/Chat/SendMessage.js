import classNames from "classnames/bind"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import styles from "./chat.module.css"
import Textarea from "./Textarea"
const cx = classNames.bind(styles)

function SendMessage() {
	const [message, setMessage] = useState("")

	return (
		<div className={cx("send-message")}>
			<div className={cx("send-more-top")}></div>
			<div className={cx("textarea-wrap")}>
				<Textarea
					className={cx("textarea")}
					onChange={(ev) => {
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
					></Button>
				</div>
			</div>
		</div>
	)
}

export default SendMessage
