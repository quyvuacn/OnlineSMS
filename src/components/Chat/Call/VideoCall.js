import api from "@/api/stringeexApi"
import NoLayout from "@/components/NoLayout"
import { getCookies } from "cookies-next"
import { useEffect, useState, useRef } from "react"

function VideoCall({ type, start, startRoom, roomResponse }) {
	const userId = getCookies().userId
	const [roomId, setRoomId] = useState("")
	const [roomToken, setRoomToken] = useState("")
	const [callClient, setCallClient] = useState(null)

	const videoContainerRef = useRef(null)

	const publish = async (screenSharing = false) => {
		console.log(StringeeVideo.createLocalVideoTrack)
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
			roomData.listTracksInfo.forEach((info) => {
				subscribe(info)
			})
		}

		await room.publish(localTrack)
		console.log("room publish successful")
	}

	const createRoom = async () => {
		console.log("Creating room")
		const room = await api.createRoom()
		const { roomId } = room
		const roomToken = await api.getRoomToken(roomId)

		setRoomId(roomId)
		setRoomToken(roomToken)
		await publish()
	}

	const joinWithId = async (roomId) => {
		// const roomId = prompt("Dán Room ID vào đây nhé!")
		if (roomId) {
			setRoomId(roomId)
			// get the room token
			const roomToken = await api.getRoomToken(roomId)
			setRoomToken(roomToken)
			// authenticate the user and publish tracks to the room
			await publish()
		}
	}

	useEffect(() => {
		const getTokens = async () => {
			api.setRestToken()
			const userToken = await api.getUserToken(userId)
			const roomToken = await api.getRoomToken(roomId)

			setRoomToken(roomToken)
			const client = new StringeeClient()

			client.on("authen", function (res) {
				// TODO: do something with the response
			})
			setCallClient(client)
			client.connect(userToken)
		}

		getTokens()
	}, [])

	useEffect(() => {
		console.log("Starting room")

		if (type == "call") {
			if (roomId) {
				startRoom(roomId)
			} else {
				createRoom()
			}
		}
		if (type == "join" && roomResponse) {
			joinWithId(roomResponse)
		}
	}, [start, roomId, roomResponse])

	return (
		<div>
			<div>
				<h2>Video call</h2>
				<div ref={videoContainerRef} />
				<br />
			</div>
		</div>
	)
}

export default VideoCall
