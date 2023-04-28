import Search from "@/components/Search"
import Chat from "@/components/Chat/ChatItem"
import Profile from "@/components/Profile/Profile"
import MainContent from "@/components/MainContent/MainContent"
import { useState, useEffect } from "react"

function Index() {
	const [boxChat, setBoxChat] = useState(0)

	return (
		<div className="content">
			<Search></Search>
			<MainContent>
				<Profile />
			</MainContent>
		</div>
	)
}

export default Index
