import typeNotification from "@/common/typeNotification"
import { ConnectionHubContext } from "@/components/ConnectionHub/ConnectionHub"
import { notify } from "@/redux/reducers/notificationSlice"
import { TaskNames } from "@/services/chatHubService"
import { Button } from "@nextui-org/react"
import { useContext, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

function VideoCall({ boxchatId }) {
	const { connectionHub } = useContext(ConnectionHubContext)
	const isCalling = !!useSelector((state) => state.calling)
	const dispatch = useDispatch()

	const callVideoTo = () => {
		const isTrue = confirm("Xác nhận mở tab mới để bắt đầu cuộc gọi")
		if (!isTrue) return
		const data = {
			boxchatId,
			type: "Video",
		}
		window.open(`/call/${boxchatId}?type=call`, "_blank")
	}
	return (
		<>
			<Button
				auto
				light
				icon={<i class="fa-regular fa-video"></i>}
				onClick={callVideoTo}
			></Button>
		</>
	)
}

export default VideoCall
