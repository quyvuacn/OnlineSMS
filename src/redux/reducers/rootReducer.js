import { combineReducers } from "@reduxjs/toolkit"
import todosSlice from "@/redux/reducers/todosSlice"
import formRegisterSlice from "@/redux/reducers/formRegisterSlice"

const rootReducer = combineReducers({
	formRegister: formRegisterSlice,
	todos: todosSlice,
})

export default rootReducer
