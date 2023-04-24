import { useRouter } from "next/router"
import { useEffect } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"

function Logout() {
	const router = useRouter()
	useEffect(() => {
		deleteCookie("token")
		router.push("/login")
	}, [])
	return
}

export default Logout
