import * as signalR from "@microsoft/signalr"
import { getCookies, setCookie } from "cookies-next"
import md5 from "md5"

class ChatHubService {
	constructor() {
		// http://192.168.1.8:5141/
		// http://localhost:5141/
		const token = getCookies()["token"]
		this.connectionHub = new signalR.HubConnectionBuilder()
			.withUrl(`http://192.168.1.8:5141/chathub`, {
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
	CallTo: "CallTo",
	ListenCall: "ListenCall",
	PickUp: "PickUp",
	ListenPickUp: "ListenPickUp",
	SendRoom: "SendRoom",
	ListenSendRoom: "ListenSendRoom",
}
export default ChatHubService
