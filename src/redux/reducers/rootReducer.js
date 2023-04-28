import { combineReducers } from "@reduxjs/toolkit"
import todosSlice from "@/redux/reducers/todosSlice"
import formRegisterSlice from "@/redux/reducers/formRegisterSlice"
import notificationSlice from "@/redux/reducers/notificationSlice"
import tabSlice from "@/redux/reducers/tabSlice"
import boxChatSlice from "@/redux/reducers/boxChatSlice"

const rootReducer = combineReducers({
	formRegister: formRegisterSlice,
	todos: todosSlice,
	notification: notificationSlice,
	tab: tabSlice,
	boxChat: boxChatSlice,
})

export default rootReducer
