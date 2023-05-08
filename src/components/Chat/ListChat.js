import { useContext } from "react"
import ChatItem from "./ChatItem"
import { ConnectionHubContext } from "../ConnectionHub/ConnectionHub"

function ListChat({ handleBoxChatId, presentBoxChatId }) {
	const { boxChats } = useContext(ConnectionHubContext) || []
	return (
		<>
			{boxChats.map((boxChat, index) => {
				return (
					<ChatItem
						key={index}
						info={boxChat}
						handleBoxChatId={handleBoxChatId}
						presentBoxChatId={presentBoxChatId}
					/>
				)
			})}
		</>
	)
}

export default ListChat
