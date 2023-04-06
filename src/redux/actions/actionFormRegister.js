import { createAction } from "@reduxjs/toolkit"

export const setUserName = createAction(
	"registerForm/setUserName",
	function (data) {
		return {
			payload: {
				userName: {
					...data,
				},
				stateName: "userName",
			},
		}
	},
)
export const setPhoneNumber = createAction(
	"registerForm/setPhoneNumber",
	function () {
		return {
			payload: {
				phoneNumber: {
					...data,
				},
				stateName: "phoneNumber",
			},
		}
	},
)
export const setEmail = createAction("registerForm/setEmail", function () {
	return {
		payload: {
			email: {
				...data,
			},
			stateName: "email",
		},
	}
})
export const setPassword = createAction(
	"registerForm/setPassword",
	function () {
		return {
			payload: {
				password: {
					...data,
				},
				stateName: "password",
			},
		}
	},
)
export const setConfirmPassword = createAction(
	"registerForm/setConfirmPassword",
	function () {
		return {
			payload: {
				confirmPassword: {
					...data,
				},
				stateName: "confirmPassword",
			},
		}
	},
)
export const setVerifycode = createAction(
	"registerForm/setVerifycode",
	function () {
		return {
			payload: {
				verifyCode: {
					...data,
				},
				stateName: "verifyCode",
			},
		}
	},
)
