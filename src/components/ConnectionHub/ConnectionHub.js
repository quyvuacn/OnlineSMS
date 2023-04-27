import { useEffect, useState, createContext, useCallback } from "react"
import * as signalR from "@microsoft/signalr"
import { getCookies, setCookie } from "cookies-next"
import chatApi from "@/api/chatApi"

export const ConnectionHubContext = createContext()

function ConnectionHub({ children }) {
	const [connectionHub, setConnectionHub] = useState()
	const [boxChats, setBoxChats] = useState()

	useEffect(() => {
		console.log("Render......")

		const start = async () => {
			try {
				if (!connectionHub) {
					const token = getCookies()["token"]
					const connection = new signalR.HubConnectionBuilder()
						.withUrl(`http://localhost:5141/chathub`, {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						})
						.build()
					await connection.start()
					console.log("okokok")
				}

				if (!boxChats) {
					const { data } = await chatApi.getBoxChats()
					console.log(data)
				}

				// setConnectionHub(connection)
				// setBoxChats(data)
			} catch (error) {
				console.log(error)
			}
		}

		start()
	}, [])

	return (
		<ConnectionHubContext.Provider value={{ connectionHub, boxChats }}>
			{children}
		</ConnectionHubContext.Provider>
	)
}

export default ConnectionHub
