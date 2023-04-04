import { combineReducers } from "@reduxjs/toolkit"
import todosSlice from "@/redux/reducers/todosSlice"

const rootReducer = combineReducers({
	todos: todosSlice,
})

export default rootReducer
