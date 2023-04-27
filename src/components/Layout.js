import { useEffect, useState } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"
import Sidebar from "./Sidebar"
import Notification from "./Toast/Notification"
import { useRouter } from "next/router"
import { profileUser } from "@/api/profileApi"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "@/redux/reducers/notificationSlice"
import typeNotification from "@/common/typeNotification"
import chatHub from "@/api/chatHub"
import ConnectionHub from "./ConnectionHub/ConnectionHub"

function Layout({ children }) {
	const router = useRouter()
	const dispatch = useDispatch()
	const initConnectionId = getCookies()["connectionId"]

	useEffect(() => {
		if (router.pathname != "/profile/edit") {
			profileUser
				.checkUser()
				.then((response) => {})
				.catch((err) => {
					const { message } = err
					dispatch(
						notify({
							message,
							type: typeNotification.error,
						}),
					)
					router.push("/profile/edit")
				})
		}
	})

	return (
		<ConnectionHub>
			<Notification />
			<Sidebar />
			<main id="main">{children}</main>
		</ConnectionHub>
	)
}

export default Layout
