import { useEffect, useState, createContext } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"
import { useDispatch, useSelector } from "react-redux"
import chatApi from "@/api/chatApi"
import {
	addBoxChatMessage,
	updateBoxChatMessage,
} from "@/redux/reducers/boxChatSlice"

import ChatHubService, { TaskNames } from "@/services/chatHubService"
import ModalCallTo from "../Chat/Contact/ModalCallTo"
import { setCallinng } from "@/redux/reducers/callingSlice"

export const ConnectionHubContext = createContext()

function ConnectionHub({ children }) {
	const [connectionHub, setConnectionHub] = useState()
	const [boxChats, setBoxChats] = useState()
	const [showModalCallTo, setShowCallTo] = useState(false)

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
				setTimeout(() => {
					start()
				}, 1500)
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
				const { boxchatId } = data

				let boxChatTarget = boxChats.find(
					(boxChat) => boxChat.boxchatId == boxchatId,
				)
				let spliceBoxchats = boxChats.filter(
					(b) => b.boxchatId != boxChatTarget.boxchatId,
				)
				boxChatTarget = {
					...boxChatTarget,
					lastMessageContent: data?.content,
					lastUserSendFullName: data.lastUserSendFullName,
					lastUserSendId: data.userSendId,
					startDate: data.startDate,
				}

				let updateBoxchats = [boxChatTarget, ...spliceBoxchats]

				setBoxChats(updateBoxchats)
				setUnreadMessages(boxchatId, true)
				crudBoxChatMessages.updateBoxChatMessage(data)
			})
			return () => {
				connectionHub.off(TaskNames.ListenMesage)
			}
		}
	}, [connectionHub, boxChats])

	useEffect(() => {
		if (connectionHub) {
			connectionHub.on(TaskNames.ListenCall, function (data) {
				console.log(data)
				setShowCallTo(true)
				dispatch(setCallinng(data))
			})
			return () => {
				connectionHub.off(TaskNames.ListenCall)
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
			dispatch(addBoxChatMessage(data))
		},
		find(boxchatId) {
			return boxChatMessages[boxchatId]
		},
		updateBoxChatMessage(infoMessage) {
			dispatch(updateBoxChatMessage(infoMessage))
		},
	}

	const setUnreadMessages = (boxchatId, newMessage = false) => {
		let newBoxchats = []
		const curentBoxchatId = boxChatMessages.boxchatId

		if (newMessage && curentBoxchatId != boxchatId) {
			newBoxchats = boxChats.map((b) => {
				let newB = {
					...b,
				}
				if (newB.boxchatId == boxchatId) {
					newB.unreadMessages++
				}
				return newB
			})
		} else {
			newBoxchats = boxChats.map((b) => {
				let newB = {
					...b,
				}
				if (newB.boxchatId == boxchatId) {
					newB.unreadMessages = 0
				}
				return newB
			})
		}
		setBoxChats(newBoxchats)
	}

	return (
		<ConnectionHubContext.Provider
			value={{
				connectionHub,
				boxChats,
				boxChatMessages,
				crudBoxChatMessages,
				setUnreadMessages,
			}}
		>
			<ModalCallTo
				isShow={showModalCallTo}
				hideModalCallTo={() => {
					setShowCallTo(false)
				}}
				showModalCallTo={() => {
					setShowCallTo(false)
				}}
			/>
			{connectionHub && boxChats && children}
		</ConnectionHubContext.Provider>
	)
}

export default ConnectionHub
