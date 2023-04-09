import Search from "@/components/Search"
import Chat from "@/components/Chat/Chat"
import BoxChat from "@/components/Chat/BoxChat"
import MainContent from "@/components/MainContent/MainContent"
import { useState, useEffect } from "react"
import axiosConfig from "@/api/axiosConfig"

function Home() {
	const [boxChat, setBoxChat] = useState(0)
	useEffect(() => {
		axiosConfig
			.get("/Account")
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])
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
				<BoxChat />
			</MainContent>
		</div>
	)
}

export default Home
