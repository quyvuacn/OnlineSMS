import axiosConfig from "./axiosConfig"

export const AuthAPI = {
	register({ userName, email, phoneNumber, password, verifyCode }) {
		let data = {
			username: userName,
			email: email,
			phonenumber: phoneNumber,
			password: password,
			verifycode: verifyCode,
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

		// axiosConfig.get("/ok")s
		// axiosConfig
		// 	.post("/user", {})
		// 	.then(function (response) {
		// 		console.log(response)
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error)
		// 	})
		return axiosConfig.post("/Account/verify-phonenumber", data)
	},
}
