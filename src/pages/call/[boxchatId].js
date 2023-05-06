import NoLayout from "@/components/NoLayout"
import { useEffect, useState, createContext } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"
import { useRouter } from "next/router"
import ChatHubService, { TaskNames } from "@/services/chatHubService"
import VideoCall from "@/components/Chat/Call/VideoCall"

function Call() {
	const router = useRouter()
	const type = router.query?.type
	const boxchatId = router.query?.boxchatId

	const myUserId = getCookies().userId

	const [connectionHub, setConnectionHub] = useState()
	const [start, setStart] = useState(false)
	const [roomResponse, setRoomResponse] = useState("")

	useEffect(() => {
		let chatHubService = new ChatHubService()

		const start = async () => {
			try {
				if (!connectionHub) {
					await chatHubService.connectionHub.start()
					console.log("Connected")
					setConnectionHub(chatHubService)
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
		if (!connectionHub) return

		if (type == "call") {
			const data = {
				boxchatId,
				type: "Video",
			}
			connectionHub.invoke(TaskNames.CallTo, data, function (isSuccess) {
				if (!isSuccess) {
					dispatch(
						notify({
							message: "Chưa thể thực hiện cuộc gọi",
							type: typeNotification.error,
						}),
					)
				} else {
					console.log("=====================Ok")
				}
			})
		}
		if (type == "join") {
			const data = {
				isPickUp: true,
				boxchatId,
			}
			connectionHub.invoke(TaskNames.PickUp, data, function (isSuccess) {
				if (isSuccess) {
					console.log("=====================Ok")
				}
			})
			connectionHub.on(TaskNames.ListenSendRoom, function (data) {
				const { roomId } = data
				setRoomResponse(roomId)
			})
		}
		connectionHub.on(TaskNames.ListenPickUp, function (data) {
			console.log("User Joining")
			setStart(true)
		})

		return () => {
			connectionHub.off(TaskNames.ListenPickUp)
			connectionHub.off(TaskNames.ListenSendRoom)
		}
	}, [connectionHub])

	const startRoom = (roomId, callback) => {
		if (!connectionHub) return

		if (type == "call") {
			console.log("Send room")
			const data = {
				boxchatId,
				roomId,
			}
			connectionHub.invoke(TaskNames.SendRoom, data, function (isSuccess) {})
		}
	}

	return (
		<div>
			<VideoCall
				type={type}
				start={start}
				startRoom={startRoom}
				roomResponse={roomResponse}
			/>
		</div>
	)
}

Call.layout = NoLayout

export default Call
