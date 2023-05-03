import { useEffect, useState } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"
import Sidebar from "./Sidebar"
import Notification from "./Toast/Notification"
import { useRouter } from "next/router"
import { profileUser } from "@/api/profileApi"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "@/redux/reducers/notificationSlice"
import typeNotification from "@/common/typeNotification"
import ConnectionHub from "./ConnectionHub/ConnectionHub"
import { setUser } from "@/redux/reducers/userSlice"

function Layout({ children }) {
	const user = useSelector((state) => state.user)

	const router = useRouter()
	const dispatch = useDispatch()
	const isUseConnectionHub = !router.pathname.startsWith("/profile")

	useEffect(() => {
		if (user.userId) {
			return
		}
		if (router.pathname != "/profile/edit") {
			profileUser
				.checkUser()
				.then((response) => {
					const { data } = response
					dispatch(setUser(data))
				})
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
		<>
			{isUseConnectionHub ? (
				<ConnectionHub>
					<Notification />
					<Sidebar />
					<main id="main">{children}</main>
				</ConnectionHub>
			) : (
				<>
					<Notification />
					<Sidebar />
					<main id="main">{children}</main>
				</>
			)}
		</>
	)
}

export default Layout
