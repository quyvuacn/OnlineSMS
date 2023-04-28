import { createSlice } from "@reduxjs/toolkit"

const boxChatSlice = createSlice({
	name: "boxChat",
	initialState: {
		boxChatId: null,
	},
	reducers: {
		setBoxChatId: (state, action) => {
			return {
				...state,
				...action.payload,
			}
		},
	},
})

export const { setBoxChatId } = boxChatSlice.actions

export default boxChatSlice.reducer
