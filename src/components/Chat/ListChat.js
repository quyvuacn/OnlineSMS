import { useState, useEffect, useContext } from "react"
import Chat from "./Chat"
import chatApi from "@/api/chatApi"
import { ConnectionHubContext } from "../ConnectionHub/ConnectionHub"

function ListChat() {
	const { boxChats } = useContext(ConnectionHubContext) || []

	console.log(boxChats)
	return (
		<>
			{/* {boxChats.map((boxChat) => {
				return <Chat />
			})} */}
		</>
	)
}

export default ListChat
