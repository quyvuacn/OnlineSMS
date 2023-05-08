import axiosConfig from "./axiosConfig"

export default {
	getBoxChats() {
		return axiosConfig.get("/Boxchat")
	},
	getMessages(boxchatId) {
		const data = {
			boxchatId,
		}
		return axiosConfig.post("/Boxchat/get-messages", data)
	},
	readAllMessagesBoxchat(boxchatId) {
		const data = {
			boxchatId,
		}
		return axiosConfig.post("/Boxchat/read-all-messages", data)
	},
	createGroup({ avatar, groupName, members = [] }) {
		const data = { avatar, groupName, members }
		return axiosConfig.post("/Boxchat/create-group", data)
	},
}
