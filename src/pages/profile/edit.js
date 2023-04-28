import Search from "@/components/Search"
import Chat from "@/components/Chat/ChatItem"
import BoxChat from "@/components/Chat/BoxChat"
import Profile from "@/components/Profile/Profile"
import MainContent from "@/components/MainContent/MainContent"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { profileUser } from "@/api/profileApi"

function Edit() {
	const [boxChat, setBoxChat] = useState(0)
	const router = useRouter()

	const [profile, setProfile] = useState()

	return (
		<div className="content">
			<Search>
				<Chat
					active={boxChat == 1}
					boxChatId={1}
					onClick={() => {
						setBoxChat(1)
					}}
				/>
				<Chat
					active={boxChat == 2}
					boxChatId={2}
					onClick={() => {
						setBoxChat(2)
					}}
				/>
				<Chat
					active={boxChat == 3}
					boxChatId={3}
					onClick={() => {
						setBoxChat(3)
					}}
				/>
				<Chat
					active={boxChat == 4}
					boxChatId={4}
					onClick={() => {
						setBoxChat(4)
					}}
				/>
				<Chat
					active={boxChat == 5}
					boxChatId={5}
					onClick={() => {
						setBoxChat(5)
					}}
				/>
			</Search>
			<MainContent>
				<Profile />
			</MainContent>
		</div>
	)
}

export default Edit
