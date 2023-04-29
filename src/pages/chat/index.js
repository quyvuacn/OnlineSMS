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
	const { boxChats, connectionHub, boxChatMessages, crudBoxChatMessages } =
		useContext(ConnectionHubContext)

	const boxChat = useSelector((state) => state.boxChat)

	const [boxChatPresent, setBoxChatPresent] = useState(
		boxChats.find((item) => item.boxChatId == boxChat.boxChatId),
	)

	const dispatch = useDispatch()

	const handleBoxChatId = (boxChatId) => {
		dispatch(
			setBoxChatId({
				boxChatId,
			}),
		)
		setBoxChatPresent(
			boxChats.find((item) => item.boxChatId == boxChat.boxChatId),
		)

		let listBoxchatMessage = crudBoxChatMessages.find(boxChatId)
		if (!listBoxchatMessage) {
			chatApi
				.getMessages(boxChatId)
				.then((response) => {
					const { data } = response
					crudBoxChatMessages.create(data)
					console.log(data)
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
					presentBoxChatId={boxChat.boxChatId}
				/>
			</Search>
			<MainContent>
				{boxChat.boxChatId && <BoxChat info={boxChatPresent} />}
			</MainContent>
		</div>
	)
}

export default Home
