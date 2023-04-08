import { createSlice } from "@reduxjs/toolkit"

import typeNotification from "@/common/typeNotification"

const initialState = {
	message: null,
	type: typeNotification.info,
	time: Date.now(),
}

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		notify: (state, action) => {
			return {
				...state,
				...action.payload,
				time: Date.now(),
			}
		},
	},
})
export const { notify } = notificationSlice.actions
export default notificationSlice.reducer
