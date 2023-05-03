import * as signalR from "@microsoft/signalr"
import { getCookies, setCookie } from "cookies-next"
import md5 from "md5"

class ChatHubService {
	constructor() {
		const token = getCookies()["token"]
		this.connectionHub = new signalR.HubConnectionBuilder()
			.withUrl(`http://localhost:5141/chathub`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.build()
	}

	on(taskName, callback) {
		this.connectionHub.on(taskName, (data) => {
			if (typeof callback === "function") {
				callback(data)
			}
		})
	}

	invoke(taskName, data = {}, callback) {
		this.connectionHub
			.invoke(taskName, data)
			.then(() => {
				if (typeof callback === "function") {
					callback(true)
				}
			})
			.catch(() => {
				if (typeof callback === "function") {
					callback(false)
				}
			})
	}

	off(taskName) {
		this.connectionHub.off(taskName)
	}
}
export const TaskNames = {
	SendMessageTo: "SendMessageTo",
	ListenMesage: "ListenMesage",
}
export default ChatHubService
