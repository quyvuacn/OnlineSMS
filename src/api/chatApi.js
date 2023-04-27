import axiosConfig from "./axiosConfig"

export default {
	getBoxChats() {
		return axiosConfig.get("/Boxchat")
	},
}
