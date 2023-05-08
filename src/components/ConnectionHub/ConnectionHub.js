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

	const [showCallTo, setShowCallTo] = useState(false)

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
				console.log("Connected")
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
				const currentBoxchatId = boxChatMessages.boxchatId

				let boxChatTarget = boxChats.find(
					(boxChat) => boxChat.boxchatId == boxchatId,
				)
				console.log(boxChatTarget)

				if (boxChatTarget) {
					let spliceBoxchats = boxChats.filter((b) => b.boxchatId != boxchatId)
					let listBoxchatMessage = crudBoxChatMessages.find(boxchatId)
					let unreadMessages = boxChatTarget.unreadMessages
						? boxChatTarget.unreadMessages
						: 0

					boxChatTarget = {
						...boxChatTarget,
						lastMessageContent: data?.content,
						lastUserSendFullName: data.lastUserSendFullName,
						lastUserSendId: data.userSendId,
						startDate: data.startDate,
						unreadMessages: unreadMessages + 1,
					}

					if (boxchatId == currentBoxchatId) {
						boxChatTarget.unreadMessages = 0
					}

					let updateBoxchats = [boxChatTarget, ...spliceBoxchats]

					if (!listBoxchatMessage) {
						chatApi
							.getMessages(boxchatId)
							.then((response) => {
								const { data } = response
								crudBoxChatMessages.addBoxChatMessage(data)
								setUnreadMessages(boxchatId, true)
								setBoxChats(updateBoxchats)
							})
							.catch((error) => {
								console.log("error")
								console.log(error)
							})
					} else {
						crudBoxChatMessages.updateBoxChatMessage(data)
						setUnreadMessages(boxchatId, true)

						setBoxChats(updateBoxchats)
					}
				}
			})
			connectionHub.on(TaskNames.ListenReloadBoxchats, function (data) {
				console.log(data)
				reloadBoxChats()
			})
			return () => {
				connectionHub.off(TaskNames.ListenMesage)
				connectionHub.off(TaskNames.ListenReloadBoxchats)
			}
		}
	}, [connectionHub, boxChats])

	useEffect(() => {
		if (connectionHub) {
			connectionHub.on(TaskNames.ListenCall, function (data) {
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

	const reloadBoxChats = async () => {
		const { data } = await chatApi.getBoxChats()
		setBoxChats(data)
	}

	return (
		<ConnectionHubContext.Provider
			value={{
				connectionHub,
				boxChats,
				boxChatMessages,
				crudBoxChatMessages,
				setUnreadMessages,
				reloadBoxChats,
			}}
		>
			{showCallTo && (
				<ModalCallTo
					isShow={showCallTo}
					hideModalCallTo={() => {
						dispatch(setCallinng({}))
						setShowCallTo(false)
					}}
				/>
			)}

			{connectionHub && boxChats && children}
		</ConnectionHubContext.Provider>
	)
}

export default ConnectionHub
