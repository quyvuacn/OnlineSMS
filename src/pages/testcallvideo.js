import api from "@/api/stringeexApi"
import NoLayout from "@/components/NoLayout"
import { useEffect, useState, useRef } from "react"

function TestCallVideo() {
	const [userToken, setUserToken] = useState("")
	const [roomId, setRoomId] = useState("")
	const [roomToken, setRoomToken] = useState("")
	const [room, setRoom] = useState(null)
	const [callClient, setCallClient] = useState(null)
	const videoContainerRef = useRef(null)

	const roomUrl = `https://${window.location.hostname}?room=${roomId}`

	useEffect(() => {
		const getTokens = async () => {
			api.setRestToken()
			const userId = `${(Math.random() * 100000).toFixed(6)}`
			const userToken = await api.getUserToken(userId)
			setUserToken(userToken)
			const roomToken = await api.getRoomToken(roomId)
			setRoomToken(roomToken)
			const client = new StringeeClient()
			client.on("authen", function (res) {
				console.log("on authen: ", res)
				// TODO: do something with the response
			})
			setCallClient(client)
			client.connect(userToken)
		}

		getTokens()
	}, [])

	const authen = async () => {
		const userId = `${(Math.random() * 100000).toFixed(6)}`
		const userToken = await api.getUserToken(userId)
		setUserToken(userToken)

		if (!callClient) {
			const client = new StringeeClient()

			client.on("authen", function (res) {
				console.log("on authen: ", res)
			})
			setCallClient(client)
		}
		callClient.connect(userToken)
	}

	const publish = async (screenSharing = false) => {
		const localTrack = await StringeeVideo.createLocalVideoTrack(callClient, {
			audio: true,
			video: true,
			screen: screenSharing,
			videoDimensions: { width: 640, height: 360 },
		})

		const videoElement = localTrack.attach()
		videoContainerRef.current.appendChild(videoElement)

		const roomData = await StringeeVideo.joinRoom(callClient, roomToken)
		const room = roomData.room
		console.log({ roomData, room })

		if (!room) {
			setRoom(room)
			room.clearAllOnMethos()
			room.on("addtrack", (e) => {
				const track = e.info.track

				console.log("addtrack", track)
				if (track.serverId === localTrack.serverId) {
					console.log("local")
					return
				}
				subscribe(track)
			})
			room.on("removetrack", (e) => {
				const track = e.track
				if (!track) {
					return
				}

				const mediaElements = track.detach()
				mediaElements.forEach((element) => element.remove())
			})

			// Join existing tracks
			roomData.listTracksInfo.forEach((info) => subscribe(info))
		}

		await room.publish(localTrack)
		console.log("room publish successful")
	}

	const createRoom = async () => {
		const room = await api.createRoom()
		const { roomId } = room
		const roomToken = await api.getRoomToken(roomId)

		setRoomId(roomId)
		setRoomToken(roomToken)
		console.log({ roomId, roomToken })

		await authen()
		await publish()
	}

	const join = async () => {
		const roomToken = await api.getRoomToken(roomId)
		setRoomToken(roomToken)

		await authen()
		await publish()
	}

	const joinWithId = async () => {
		const roomId = prompt("Dán Room ID vào đây nhé!")
		if (roomId) {
			setRoomId(roomId)

			// get the room token
			const roomToken = await api.getRoomToken(roomId)
			setRoomToken(roomToken)

			// authenticate the user and publish tracks to the room
			await authen()
			await publish()
		}
	}

	return (
		<div>
			<div>
				<h2>Video call</h2>
				<div ref={videoContainerRef} />
				<br />
				<button onClick={createRoom}>Tạo phòng mới</button>
				<button onClick={join}>Tham gia phòng</button>
			</div>
		</div>
	)
}

export default TestCallVideo

TestCallVideo.layout = NoLayout
