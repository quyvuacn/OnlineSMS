import classNames from "classnames/bind"
import styles from "./chat.module.css"
import MessageItem from "./MessageItem"
const cx = classNames.bind(styles)

function ListMessageItem({ boxChatMessages }) {
	return (
		<>
			<MessageItem />
			<MessageItem isYourself={true} />
		</>
	)
}

export default ListMessageItem
