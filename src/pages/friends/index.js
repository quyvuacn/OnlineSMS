import Search from "@/components/Search"
import MainContent from "@/components/MainContent/MainContent"
import { useState, useEffect } from "react"
import axiosConfig from "@/api/axiosConfig"
import TabFriends from "@/components/Friends/TabFriends"
import Friends from "@/components/Friends/Friends"
import tabFriends from "@/common/tabFriends"
import { useDispatch, useSelector } from "react-redux"
import { setTab } from "@/redux/reducers/tabSlice"

function Index() {
	const tab = useSelector((state) => state.tab)
	const dispatch = useDispatch()

	const handleTabFriends = (tab) => {
		dispatch(setTab(tab))
	}
	return (
		<div className="content">
			<Search>
				<TabFriends handleTabFriends={handleTabFriends} />
			</Search>
			<MainContent>{tab.componentContent}</MainContent>
		</div>
	)
}

export default Index
