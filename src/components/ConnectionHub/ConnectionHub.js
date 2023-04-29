import { useEffect, useState, createContext, useCallback } from "react"
import * as signalR from "@microsoft/signalr"
import { getCookies, setCookie } from "cookies-next"
import chatApi from "@/api/chatApi"
import ChatHubService from "@/services/chatHubService"

export const ConnectionHubContext = createContext()

function ConnectionHub({ children }) {
	const [connectionHub, setConnectionHub] = useState()
	const [boxChats, setBoxChats] = useState()
	const [boxChatMessages, setBoxChatMessages] = useState([])

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
				setTimeout(start, 500)
			}
		}

		start()

		return () => {
			clearTimeout(start)
		}
	}, [])

	const crudBoxChatMessages = {
		create(data) {
			setBoxChatMessages((b) => {
				return [...b, data]
			})
		},
		find(boxChatId) {
			return boxChatMessages.find((b) => b.boxchatId == boxChatId)
		},
		updateBoxChatMessage() {},
	}

	useEffect(() => {})

	return (
		<ConnectionHubContext.Provider
			value={{ connectionHub, boxChats, boxChatMessages, crudBoxChatMessages }}
		>
			{connectionHub && boxChats && children}
		</ConnectionHubContext.Provider>
	)
}

export default ConnectionHub
