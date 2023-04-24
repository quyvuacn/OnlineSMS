import axiosConfig from "./axiosConfig"

export default {
	findFriend(phoneNumber) {
		const data = {
			phoneNumber,
		}
		return axiosConfig.post("/Friends", data)
	},
	addFriend(userId) {
		const data = {
			userId,
		}
		return axiosConfig.post("/Friends/add-friend", data)
	},
	deleteFriendRequest(userRequestId, userAcceptId) {
		const data = {
			userRequestId,
			userAcceptId,
		}
		return axiosConfig.post("/Friends/delete-friend-request", data)
	},
	agreeFriend(userRequestId, userAcceptId) {
		const data = {
			userRequestId,
			userAcceptId,
		}
		return axiosConfig.post("/Friends/agree-friend-request", data)
	},
	unfriend(userRequestId, userAcceptId) {
		const data = {
			userRequestId,
			userAcceptId,
		}
		return axiosConfig.post("/Friends/unfriend", data)
	},
	listFriend() {
		return axiosConfig.get("/Friends/list-friend")
	},
	listFriendRequest() {
		return axiosConfig.get("/Friends/list-friend-request")
	},
	listFriendAccept() {
		return axiosConfig.get("/Friends/list-friend-accept")
	},
}
