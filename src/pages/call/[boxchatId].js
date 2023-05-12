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

		connectionHub.on(TaskNames.ListenCancel, function (data) {
			alert("Cuộc gọi đã kết thúc!")
			setTimeout(() => {
				window.close()
			}, 2500)
		})

		if (type == "join") {
			const data = {
				isPickUp: true,
				boxchatId,
			}
			connectionHub.on(TaskNames.ListenSendRoom, function (data) {
				const { roomId } = data
				console.log(roomId)
				setRoomResponse(roomId)
			})

			connectionHub.invoke(TaskNames.PickUp, data, function (isSuccess) {
				if (isSuccess) {
					console.log("=====================Ok")
				}
			})
		}

		if (type == "call") {
			const data = {
				boxchatId,
				type: "Video",
			}
			connectionHub.on(TaskNames.ListenPickUp, function (data) {
				console.log("User Joining")
				setStart(true)
			})

			connectionHub.invoke(TaskNames.CallTo, data, function (isSuccess) {
				if (!isSuccess) {
					setTimeout(() => {
						// window.close()
					}, 1500)
				} else {
					console.log("=====================Ok")
				}
			})
		}

		return () => {
			connectionHub.off(TaskNames.ListenPickUp)
			connectionHub.off(TaskNames.ListenSendRoom)
		}
	}, [connectionHub])

	const startRoom = (roomId, callback) => {
		if (!connectionHub) return
		console.log("Sending room " + roomId)
		if (type == "call") {
			const data = {
				boxchatId,
				roomId,
			}
			connectionHub.invoke(TaskNames.SendRoom, data, function (isSuccess) {
				if (isSuccess) {
					console.log("Send room succeeded", roomId)
				} else {
					console.log("Send room failed", roomId)
				}
			})
		}
	}

	return (
		<div>
			<VideoCall
				type={type}
				start={start}
				startRoom={startRoom}
				roomResponse={roomResponse}
				connectionHub={connectionHub}
				boxchatId={boxchatId}
			/>
		</div>
	)
}

Call.layout = NoLayout

export default Call
