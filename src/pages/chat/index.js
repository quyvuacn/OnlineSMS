import { getCookies, setCookie, deleteCookie } from "cookies-next"
import Search from "@/components/Search"
import BoxChat from "@/components/Chat/BoxChat"
import MainContent from "@/components/MainContent/MainContent"
import { useState, useEffect, useRef, useContext } from "react"
import ListChat from "@/components/Chat/ListChat"
import { useDispatch, useSelector } from "react-redux"
import { setBoxChatId } from "@/redux/reducers/boxChatSlice"
import { ConnectionHubContext } from "@/components/ConnectionHub/ConnectionHub"
import chatApi from "@/api/chatApi"

function Home() {
	const { boxChats, crudBoxChatMessages } = useContext(ConnectionHubContext)

	const boxChat = useSelector((state) => state.boxChat)

	const [boxChatPresent, setBoxChatPresent] = useState(
		boxChats.find((item) => item.boxchatId == boxChat.boxchatId),
	)

	const dispatch = useDispatch()

	const handleBoxChatId = (boxchatId) => {
		if (boxchatId == boxChat.boxchatId) return

		dispatch(
			setBoxChatId({
				boxchatId,
			}),
		)

		setBoxChatPresent(boxChats.find((item) => item.boxchatId == boxchatId))

		let listBoxchatMessage = crudBoxChatMessages.find(boxchatId)
		if (!listBoxchatMessage) {
			chatApi
				.getMessages(boxchatId)
				.then((response) => {
					const { data } = response
					crudBoxChatMessages.addBoxChatMessage(data)
				})
				.catch((error) => {
					console.log("error")
					console.log(error)
				})
		}
	}

	return (
		<div className="content">
			<Search>
				<ListChat
					handleBoxChatId={handleBoxChatId}
					presentBoxChatId={boxChat.boxchatId}
				/>
			</Search>
			<MainContent>
				{boxChatPresent && <BoxChat info={boxChatPresent} />}
			</MainContent>
		</div>
	)
}

export default Home
