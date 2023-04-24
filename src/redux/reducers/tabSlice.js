import { createSlice } from "@reduxjs/toolkit"
import tabFriends from "@/common/tabFriends"

const tabSlice = createSlice({
	name: "tab",
	initialState: tabFriends[0],
	reducers: {
		setTab: (state, action) => {
			return {
				...state,
				...action.payload,
			}
		},
	},
})
export const { setTab } = tabSlice.actions

export default tabSlice.reducer
