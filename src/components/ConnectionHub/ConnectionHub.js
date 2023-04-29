import { useEffect, useState, createContext } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"
import { useDispatch, useSelector } from "react-redux"
import chatApi from "@/api/chatApi"
import {
	addBoxChatMessage,
	updateBoxChatMessage,
} from "@/redux/reducers/boxChatSlice"

import ChatHubService, { TaskNames } from "@/services/chatHubService"

export const ConnectionHubContext = createContext()

function ConnectionHub({ children }) {
	const [connectionHub, setConnectionHub] = useState()
	const [boxChats, setBoxChats] = useState()

	const boxChatMessages = useSelector((state) => state.boxChat)
	const dispatch = useDispatch()

	useEffect(() => {
		let chatHubService = new ChatHubService()

		const start = async () => {
			try {
				if (!connectionHub) {
					await chatHubService.connectionHub.start()
					setConnectionHub(chatHubService)
				}

				if (!boxChats) {
					const { data } = await chatApi.getBoxChats()
					setBoxChats(data)
				}
			} catch (error) {
				chatHubService = new ChatHubService()
				setTimeout(start, 500)
			}
		}

		start()

		return () => {
			setConnectionHub(null)
			clearTimeout(start)
		}
	}, [])

	useEffect(() => {
		if (connectionHub) {
			connectionHub.on(TaskNames.ListenMesage, function (data) {
				crudBoxChatMessages.updateBoxChatMessage(data)
			})
			return () => {
				connectionHub.off(TaskNames.ListenMesage)
			}
		}
	}, [connectionHub])

	const crudBoxChatMessages = {
		addBoxChatMessage(data) {
			const memberChats =
				boxChats.find((boxChat) => boxChat.boxchatId == data.boxchatId)
					?.memberChats || []

			data = {
				...data,
				memberChats,
			}
			console.log(data)
			dispatch(addBoxChatMessage(data))
		},
		find(boxchatId) {
			return boxChatMessages[boxchatId]
		},
		updateBoxChatMessage(infoMessage) {
			dispatch(updateBoxChatMessage(infoMessage))
		},
	}

	return (
		<ConnectionHubContext.Provider
			value={{
				connectionHub,
				boxChats,
				boxChatMessages,
				crudBoxChatMessages,
			}}
		>
			{connectionHub && boxChats && children}
		</ConnectionHubContext.Provider>
	)
}

export default ConnectionHub
