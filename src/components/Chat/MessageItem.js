import classNames from "classnames/bind"
import styles from "./chat.module.css"
import { Avatar, Card, Text, Tooltip } from "@nextui-org/react"
import { createElement } from "react"
import { useSelector } from "react-redux"
const cx = classNames.bind(styles)

function MessageItem({ isYourself = false, message }) {
	const { content, avatar, startDate, tooltipTime, userFullName } = message
	console.log(message)
	const formatStartDate = new Date(startDate)
	const fillStartDate =
		formatStartDate.getHours().toString().padStart(2, "0") +
		":" +
		formatStartDate.getMinutes().toString().padStart(2, "0")

	return (
		<div
			className={cx("wrap_message-item", {
				"row-reverse": isYourself,
			})}
		>
			<div className="message-item-avatar">
				<Tooltip
					content={isYourself ? "You" : userFullName}
					rounded
					color="primary"
					placement={"top"}
				>
					<Avatar src={avatar ?? "/images/default-avatar.png"} size="md" />
				</Tooltip>
			</div>
			<div className={cx("list-message-item-content")}>
				<Tooltip
					content={tooltipTime}
					rounded
					color="primary"
					placement={isYourself ? "left" : "right"}
				>
					<Card
						css={{
							mw: "400px",
							width: "fit-content",
							marginLeft: isYourself ? "auto" : "0",
							borderRadius: "16px",
						}}
						className={cx("message-item-content")}
					>
						<Card.Body>
							<Text dangerouslySetInnerHTML={{ __html: content }}></Text>
						</Card.Body>
					</Card>
				</Tooltip>
				<Text
					style={{ marginTop: 8, textAlign: isYourself ? "right" : "left" }}
					size="$xs"
				>
					{fillStartDate}
				</Text>
			</div>
		</div>
	)
}

export default MessageItem
