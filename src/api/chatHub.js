import axiosConfig from "./axiosConfig"

export default {
	connectChatHub() {
		return axiosConfig.get("/ChatHub/connect-to-chathub")
	},
}
