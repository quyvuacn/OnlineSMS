import { useState } from "react"
import Chat from "./Chat"

function ListChat() {
	const [boxChat, setBoxChat] = useState(0)

	return (
		<>
			<Chat
				active={boxChat == 1}
				boxChatId={1}
				onClick={() => {
					setBoxChat(1)
				}}
			/>
			<Chat
				active={boxChat == 2}
				boxChatId={2}
				onClick={() => {
					setBoxChat(2)
				}}
			/>
			<Chat
				active={boxChat == 3}
				boxChatId={3}
				onClick={() => {
					setBoxChat(3)
				}}
			/>
			<Chat
				active={boxChat == 4}
				boxChatId={4}
				onClick={() => {
					setBoxChat(4)
				}}
			/>
			<Chat
				active={boxChat == 5}
				boxChatId={5}
				onClick={() => {
					setBoxChat(5)
				}}
			/>
		</>
	)
}

export default ListChat
