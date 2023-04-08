import axiosConfig from "./axiosConfig"

export const AuthAPI = {
	register({ userName, email, phoneNumber, password, verifyCode }) {
		let data = {
			userName: userName,
			email: email,
			phoneNumber: phoneNumber,
			password: password,
			verifyCode: verifyCode,
		}
		return axiosConfig.post("/Account/register", data)
	},
	login({ phoneNumber, password, verifyCode = null }) {
		let data = {
			phonenumber: phoneNumber,
			password: password,
			verifycode: verifyCode,
		}

		return axiosConfig.post("/Account/login", data)
	},
	logout() {},
	verifyPhoneNumber(phoneNumber) {
		let data = { phoneNumber: phoneNumber }
		return axiosConfig.post("/Account/verify-phonenumber", data)
	},
}
