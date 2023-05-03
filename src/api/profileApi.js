import axiosConfig, { axiosUploadFile } from "./axiosConfig"

export const profileUser = {
	getProfile(userId) {
		const data = { userId }
		return axiosConfig.post("/Profile", data)
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
		return axiosConfig.post("/Profile/update-overview", data)
	},
	getMoreProfile() {
		return axiosConfig.get("/Profile/more-profile")
	},
	createHobbie(hobbieName) {
		return axiosConfig.post("/Profile/create-hobbie", { name: hobbieName })
	},
	createCuisin(cuisineName) {
		return axiosConfig.post("/Profile/create-cuisine", { name: cuisineName })
	},
	updateAvatar(blobUrl) {
		const data = {
			blobUrl,
		}
		console.log(data)
		return axiosConfig.post("/Profile/update-avatar", data)
	},
}
