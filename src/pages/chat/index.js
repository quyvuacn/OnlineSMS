import Search from "@/components/Search"
import Chat from "@/components/Chat/Chat"
import BoxChat from "@/components/Chat/BoxChat"
import MainContent from "@/components/MainContent/MainContent"
import { useState, useEffect } from "react"
import axiosConfig from "@/api/axiosConfig"
import ListChat from "@/components/Chat/ListChat"

function Home() {
	const [boxChat, setBoxChat] = useState(0)

	return (
		<div className="content">
			<Search>
				<ListChat />
			</Search>
			<MainContent>
				<BoxChat />
			</MainContent>
		</div>
	)
}

export default Home
