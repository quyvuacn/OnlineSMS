import { combineReducers } from "@reduxjs/toolkit"
import todosSlice from "@/redux/reducers/todosSlice"
import formRegisterSlice from "@/redux/reducers/formRegisterSlice"

const rootReducer = combineReducers({
	todos: todosSlice,
	formRegister: formRegisterSlice,
})

export default rootReducer
