import { combineReducers } from "@reduxjs/toolkit"
import todosSlice from "@/redux/reducers/todosSlice"
import formRegisterSlice from "@/redux/reducers/formRegisterSlice"
import notificationSlice from "@/redux/reducers/notificationSlice"

const rootReducer = combineReducers({
	formRegister: formRegisterSlice,
	todos: todosSlice,
	notification: notificationSlice,
})

export default rootReducer
