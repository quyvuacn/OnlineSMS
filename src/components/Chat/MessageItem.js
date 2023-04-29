import classNames from "classnames/bind"
import styles from "./chat.module.css"
import { Avatar, Card, Text } from "@nextui-org/react"
const cx = classNames.bind(styles)

function MessageItem({ isYourself = false, content }) {
	return (
		<div
			className={cx("wrap_message-item", {
				"row-reverse": isYourself,
			})}
		>
			<div className="message-item-avatar">
				<Avatar
					src="https://i.pravatar.cc/150?u=a04258114e29026702d"
					size="md"
				/>
			</div>
			<div className={cx("list-message-item-content")}>
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
						<Text>{content}</Text>
					</Card.Body>
				</Card>
			</div>
		</div>
	)
}

export default MessageItem
