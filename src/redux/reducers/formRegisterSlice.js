import { createSlice } from "@reduxjs/toolkit"

class StateInput {
	constructor() {
		this.value = ""
		this.isValidate = false
		this.info = "Required to fill in"
		this.showInfo = false
	}
}

const setState = (state, action) => {
	const data = action.payload
	const stateName = data.stateName
	delete data.stateName

	state = {
		...state,
		[stateName]: {
			...state[stateName],
			...data,
		},
	}
}

const initialState = {
	userName: new StateInput(),
	phoneNumber: new StateInput(),
	email: new StateInput(),
	password: new StateInput(),
	confirmPassword: new StateInput(),
	verifycode: new StateInput(),
}

const formRegisterSlice = createSlice({
	name: "formRegister",
	initialState: initialState,
	reducers: {
		setUserName: setState,
		setPhoneNumber: setState,
		setEmail: setState,
		setPassword: setState,
		setConfirmPassword: setState,
		setVerifycode: setState,
	},
})

export const {
	setUserName,
	setPhoneNumber,
	setEmail,
	setPassword,
	setConfirmPassword,
	setVerifycode,
} = formRegisterSlice.actions

export default formRegisterSlice
