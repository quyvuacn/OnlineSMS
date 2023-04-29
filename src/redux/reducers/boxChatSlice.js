import { createSlice } from "@reduxjs/toolkit"

const boxChatSlice = createSlice({
	name: "boxChat",
	initialState: {
		boxchatId: null,
	},
	reducers: {
		setBoxChatId: (state, action) => {
			return {
				...state,
				...action.payload,
			}
		},
		addBoxChatMessage: (state, action) => {
			const { boxchatId, listMessage } = action.payload
			console.log(action.payload)
			return {
				...state,
				[boxchatId]: {
					...state[boxchatId],
					listMessage,
				},
			}
		},
		updateBoxChatMessage: (state, action) => {
			const { boxchatId } = action.payload

			const newMessage = action.payload

			return {
				...state,
				[boxchatId]: {
					...state[boxchatId],
					listMessage: [newMessage, ...state[boxchatId].listMessage],
				},
			}
		},
	},
})

export const { setBoxChatId, addBoxChatMessage, updateBoxChatMessage } =
	boxChatSlice.actions

export default boxChatSlice.reducer
