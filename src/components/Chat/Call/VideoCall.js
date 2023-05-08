import StringeexApi from "@/api/stringeexApi"
import classNames from "classnames/bind"
import { getCookies } from "cookies-next"
import { useEffect, useState, useRef } from "react"
import styles from "./call.module.css"
import { Button, Text } from "@nextui-org/react"
import { TaskNames } from "@/services/chatHubService"

const cx = classNames.bind(styles)

function VideoCall({
	type,
	start,
	startRoom,
	roomResponse,
	connectionHub,
	boxchatId,
}) {
	const joined = useRef(false)

	const [end, setEnd] = useState(false)

	const roomInfo = useRef({
		userToken: "",
		roomId: "",
		roomToken: "",
		room: undefined,
		callClient: undefined,
		myTracks: undefined,
	})

	const handleRoomInfo = (payload) => {
		roomInfo.current = {
			...roomInfo.current,
			...payload,
		}
	}

	const [api, setApi] = useState(null)

	const initApi = async () => {
		const api = new StringeexApi()
		await api.setRestToken()
		setApi(api)
	}

	const getKeyRoomInfo = (name) => {
		if (name) {
			return roomInfo.current[name]
		}
		return roomInfo.current
	}

	const videoContainerRef = useRef(null)

	const publish = async (screenSharing = false) => {
		const callClient = getKeyRoomInfo("callClient")
		const roomToken = getKeyRoomInfo("roomToken")
		const roomCurrent = getKeyRoomInfo("room")

		try {
			console.log("Publishing")
			const localTrack = await StringeeVideo.createLocalVideoTrack(callClient, {
				audio: true,
				video: true,
				screen: screenSharing,
				videoDimensions: { width: 640, height: 360 },
			})
			handleRoomInfo({
				myTracks: localTrack,
			})
			const videoElement = localTrack.attach()
			addVideo(videoElement)

			const roomData = await StringeeVideo.joinRoom(callClient, roomToken)
			const room = roomData.room

			if (!roomCurrent) {
				handleRoomInfo({
					room,
				})

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
				room.on("")

				// Join existing tracks
				roomData.listTracksInfo.forEach((info) => {
					subscribe(info)
				})
			}

			await room.publish(localTrack)
			console.log("Room publish successful", room.publish)
		} catch (err) {
			console.log(err)
		}
	}

	const createRoom = async () => {
		try {
			console.log("Creating room")
			const room = await api.createRoom()
			const { roomId } = room
			const roomToken = await api.getRoomToken(roomId)
			handleRoomInfo({
				roomId,
				roomToken,
			})

			await authen()
			await publish()
			console.log("Created room: ", roomId)
			startRoom(roomId)
		} catch (error) {
			console.log(error)
		}
	}

	const joinWithId = async (roomId) => {
		if (roomId) {
			console.log("Joining room " + roomId)
			handleRoomInfo({
				roomId,
			})
			join()
		}
	}
	const join = async () => {
		const roomId = getKeyRoomInfo("roomId")
		const roomToken = await api.getRoomToken(roomId)
		handleRoomInfo({
			roomToken,
		})
		await authen()
		await publish()
	}

	const subscribe = async (trackInfo) => {
		const room = getKeyRoomInfo("room")
		const userPublish = trackInfo.userPublish
		const userId = getCookies()["userId"]
		const track = await room.subscribe(trackInfo.serverId)
		track.on("ready", () => {
			const videoElement = track.attach()
			if (userPublish != userId) {
				videoElement.className = cx("subject")
			} else {
				videoElement.className = cx("video")
			}

			addVideo(videoElement)
		})
	}

	const addVideo = (video) => {
		video.setAttribute("playsinline", "true")
		videoContainerRef.current.appendChild(video)
	}

	const authen = () => {
		return new Promise(async (resolve, reject) => {
			const userId = getCookies().userId
			const userToken = await api.getUserToken(userId)

			handleRoomInfo({ userToken })

			if (!roomInfo.callClient) {
				const client = new StringeeClient()
				client.on("authen", function (res) {
					console.log("on authen: ", res)
					resolve(res)
				})
				handleRoomInfo({ callClient: client })
				const callClient = getKeyRoomInfo("callClient")
				callClient.connect(userToken)
			}
		})
	}

	useEffect(() => {
		;(async () => {
			if (!api) {
				await initApi()
			}
		})()
	}, [])

	useEffect(() => {
		console.log("Starting room" + roomResponse)

		if (type == "join" && roomResponse && !joined.current) {
			joinWithId(roomResponse)
			joined.current = true
		}

		if (!start || !api) return

		const roomId = getKeyRoomInfo("roomId")
		const room = getKeyRoomInfo("room")

		if (type == "call") {
			if (roomId) {
				join()
			} else if (!room) {
				createRoom()
			}
		}
	}, [start, roomResponse, api])

	const endCall = async () => {
		const data = {
			boxchatId,
		}
		connectionHub.invoke(TaskNames.Cancel, data, function (isSuccess) {
			alert("Cuộc gọi đã kết thúc")
			setTimeout(() => {
				window.close()
			}, 2000)
		})
	}

	useEffect(() => {
		if (connectionHub) {
			console.log("ListenCancel............")
			connectionHub.on(TaskNames.ListenCancel, async function (data) {
				alert("Cuộc gọi đã kết thúc")
				setTimeout(() => {
					window.close()
				}, 2000)
			})
			return () => {
				connectionHub.off(TaskNames.ListenCancel)
			}
		}
	}, [connectionHub])

	return (
		<>
			{!end ? (
				<div className={cx("wrap")} ref={videoContainerRef}>
					<div className={cx("action")}>
						<Button
							auto
							color="error"
							icon={<i class="fa-solid fa-phone-hangup"></i>}
							onPress={endCall}
						></Button>
					</div>
				</div>
			) : (
				<Text b>Cuộc gọi đã kết thúc</Text>
			)}
		</>
	)
}

export default VideoCall
