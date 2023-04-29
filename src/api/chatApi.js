import axiosConfig from "./axiosConfig"

export default {
	getBoxChats() {
		return axiosConfig.get("/Boxchat")
	},
	getMessages(boxChatId) {
		const data = {
			boxChatId,
		}
		return axiosConfig.post("/Boxchat/get-messages", data)
	},
}
