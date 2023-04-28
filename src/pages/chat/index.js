import { getCookies, setCookie, deleteCookie } from "cookies-next"
import Search from "@/components/Search"
import BoxChat from "@/components/Chat/BoxChat"
import MainContent from "@/components/MainContent/MainContent"
import { useState, useEffect, useRef, useContext } from "react"
import ListChat from "@/components/Chat/ListChat"
import { useDispatch, useSelector } from "react-redux"
import { setBoxChatId } from "@/redux/reducers/boxChatSlice"
import { ConnectionHubContext } from "@/components/ConnectionHub/ConnectionHub"

function Home() {
	const { boxChats, connectionHub } = useContext(ConnectionHubContext)

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
