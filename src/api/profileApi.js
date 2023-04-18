import axiosConfig from "./axiosConfig"

export const profileUser = {
	getProfile(userId) {
		const data = { userId }
		return axiosConfig.get("/Profile", data)
	},
	checkUser() {
		return axiosConfig.get("/Profile/check-profile")
	},
	updateOverview({ fullName, gender, address, dateOfBirth, maritalStatus }) {
		const data = {
			fullName,
			gender,
			address,
			dateOfBirth,
			maritalStatus,
		}
		console.log(data)
		return axiosConfig.post("/Profile/update-overview", data)
	},
}
