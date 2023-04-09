import { createSlice } from "@reduxjs/toolkit"

const initStateItem = (stateName) => {
	return {
		value: "",
		isValidate: false,
		info: "Required to fill in",
		showInfo: false,
		stateName: stateName,
	}
}

const initStateVerifycode = (stateName) => {
	return {
		...initStateItem(stateName),
		isLoading: false,
		isCountdown: false,
		showBtnSend: false,
		disable: false,
		count: 60,
	}
}

const setState = (state, action) => {
	const { stateName, ...data } = action.payload
	return {
		...state,
		[stateName]: {
			...state[stateName],
			...data,
		},
	}
}

const initialForm = {
	userName: initStateItem("userName"),
	phoneNumber: initStateItem("phoneNumber"),
	email: initStateItem("email"),
	password: initStateItem("password"),
	confirmPassword: initStateItem("confirmPassword"),
	verifyCode: initStateVerifycode("verifyCode"),
	validateAll: false,
	country: {
		label: "Vietnam",
		value: "+84",
		code: "VN",
		stateName: "country",
	},
}

const formRegisterSlice = createSlice({
	name: "formRegister",
	initialState: initialForm,
	reducers: {
		setUserName: setState,
		setPhoneNumber: setState,
		setEmail: setState,
		setPassword: setState,
		setConfirmPassword: setState,
		setVerifycode: setState,
		setValidateAll: (state, action) => {
			const { validateAll } = action.payload
			return {
				...state,
				validateAll,
			}
		},
		setCountry: setState,
		clearForm: () => {
			return initialForm
		},
	},
})

export const {
	setUserName,
	setPhoneNumber,
	setEmail,
	setPassword,
	setConfirmPassword,
	setVerifycode,
	setValidateAll,
	clearForm,
} = formRegisterSlice.actions

export default formRegisterSlice.reducer
