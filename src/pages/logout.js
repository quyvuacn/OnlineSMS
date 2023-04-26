import { useRouter } from "next/router"
import { useEffect } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"
import NoLayout from "@/components/NoLayout"

function Logout() {
	const router = useRouter()
	useEffect(() => {
		deleteCookie("token")
		deleteCookie("userId")
		deleteCookie("connectionId")
		router.push("/login")
	}, [])
	return
}

Logout.layout = NoLayout

export default Logout
