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
}
