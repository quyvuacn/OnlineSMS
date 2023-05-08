import { createSlice } from "@reduxjs/toolkit"

const callingSlice = createSlice({
	name: "calling",
	initialState: null,
	reducers: {
		setCallinng(state, action) {
			return action.payload
		},
	},
})

export const { setCallinng } = callingSlice.actions

export default callingSlice.reducer
