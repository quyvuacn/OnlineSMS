import { useRouter } from "next/router"
import { useEffect } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"
import NoLayout from "@/components/NoLayout"
import { useDispatch } from "react-redux"
import { setUserDefault } from "@/redux/reducers/userSlice"

function Logout() {
	const dispatch = useDispatch()

	const router = useRouter()
	useEffect(() => {
		deleteCookie("token")
		deleteCookie("userId")
		deleteCookie("connectionId")
		deleteCookie("session")
		dispatch(setUserDefault())
		router.push("/login")
	}, [])
	return
}

Logout.layout = NoLayout

export default Logout
