import { useState, useEffect, useContext } from "react"
import ChatItem from "./ChatItem"
import chatApi from "@/api/chatApi"
import { ConnectionHubContext } from "../ConnectionHub/ConnectionHub"

function ListChat({ handleBoxChatId, presentBoxChatId }) {
	const { boxChats, boxChatMessages } = useContext(ConnectionHubContext) || []

	console.log(boxChatMessages)
	return (
		<>
			{boxChats.map((boxChat) => {
				return (
					<ChatItem
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
