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
			<Search></Search>
			<MainContent>
				<Profile />
			</MainContent>
		</div>
	)
}

export default Edit
