import * as signalR from "@microsoft/signalr"
import { getCookies } from "cookies-next"

class ChatHubService {
	constructor() {
		const token = getCookies()["token"]
		this.connectionHub = new signalR.HubConnectionBuilder()
			.withUrl(process.env.NEXT_PUBLIC_API_CHATHUB_URL, {
				headers: {
					Authorization: `Bearer ${token}`,
					Session: getCookies()["session"],
				},
				withCredentials: true,
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
			.catch((e) => {
				console.log(e)
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
	Cancel: "Cancel",
	ListenCancel: "ListenCancel",
	ReloadBoxchats: "ReloadBoxchats",
	ListenReloadBoxchats: "ListenReloadBoxchats",
}
export default ChatHubService
