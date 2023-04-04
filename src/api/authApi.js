import axiosConfig from "./axiosConfig"

export const AuthAPI = {
	register({ userName, email, phoneNumber, password, verifyCode }) {
		let data = JSON.stringify({
			username: userName,
			email: email,
			phonenumber: phoneNumber,
			password: password,
			verifycode: verifyCode,
		})

		return axiosConfig.post("Account/register", data)
	},
	login({ phoneNumber, password, verifyCode = null }) {
		let data = JSON.stringify({
			phonenumber: phoneNumber,
			password: password,
			verifycode: verifyCode,
		})

		return apiConfig.post("Account/login", data)
	},
	logout() {},
	verifyPhoneNumber({ phoneNumber }) {
		let data = JSON.stringify({ phoneNumber: phoneNumber })
		return apiConfig.post("Account/verify-phonenumber", data)
	},
}
