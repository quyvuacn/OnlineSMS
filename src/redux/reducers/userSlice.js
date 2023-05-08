import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {
		setUser: (state, action) => {
			return {
				...state,
				...action.payload,
			}
		},
		setUserDefault: (state, action) => {
			return {}
		},
	},
})

export const { setUser, setUserDefault } = userSlice.actions

export default userSlice.reducer
