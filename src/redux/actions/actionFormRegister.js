import { createAction } from "@reduxjs/toolkit"

export const setUserName = createAction(
	"formRegister/setUserName",
	function (data) {
		return {
			payload: {
				...data,
				stateName: "userName",
			},
		}
	},
)
export const setPhoneNumber = createAction(
	"formRegister/setPhoneNumber",
	function (data) {
		return {
			payload: {
				...data,
				stateName: "phoneNumber",
			},
		}
	},
)
export const setEmail = createAction("formRegister/setEmail", function (data) {
	return {
		payload: {
			...data,
			stateName: "email",
		},
	}
})
export const setPassword = createAction(
	"formRegister/setPassword",
	function (data) {
		return {
			payload: {
				...data,
				stateName: "password",
			},
		}
	},
)
export const setConfirmPassword = createAction(
	"formRegister/setConfirmPassword",
	function (data) {
		return {
			payload: {
				...data,
				stateName: "confirmPassword",
			},
		}
	},
)
export const setVerifycode = createAction(
	"formRegister/setVerifycode",
	function (data) {
		return {
			payload: {
				...data,
				stateName: "verifyCode",
			},
		}
	},
)
export const setValidateAll = createAction(
	"formRegister/setValidateAll",
	function (data) {
		return {
			payload: {
				validateAll: data,
			},
		}
	},
)
