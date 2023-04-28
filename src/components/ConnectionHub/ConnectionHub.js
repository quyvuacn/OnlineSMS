import { useEffect, useState, createContext, useCallback } from "react"
import * as signalR from "@microsoft/signalr"
import { getCookies, setCookie } from "cookies-next"
import chatApi from "@/api/chatApi"
import ChatHubService from "@/services/chatHubService"

export const ConnectionHubContext = createContext()

function ConnectionHub({ children }) {
	const [connectionHub, setConnectionHub] = useState()
	const [boxChats, setBoxChats] = useState()
	let sendMessageTo = () => {}

	useEffect(() => {
		const start = async () => {
			try {
				if (!connectionHub) {
					const chatHubService = new ChatHubService()
					await chatHubService.connectionHub.start()
					setConnectionHub(chatHubService)
				}

				if (!boxChats) {
					const { data } = await chatApi.getBoxChats()
					setBoxChats(data)
				}
			} catch (error) {
				console.log(error)
			}
		}

		start()
	}, [])

	return (
		<ConnectionHubContext.Provider value={{ connectionHub, boxChats }}>
			{connectionHub && boxChats && children}
		</ConnectionHubContext.Provider>
	)
}

export default ConnectionHub
