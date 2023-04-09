import { useRouter } from "next/router"
import { useEffect } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"

function Logout() {
	const router = useRouter()
	useEffect(() => {
		router.push("/login")
		console.log(getCookies("token"))
		deleteCookie("token")
	}, [])
	return
}

export default Logout
