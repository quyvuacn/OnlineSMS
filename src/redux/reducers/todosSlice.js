import { createSlice } from "@reduxjs/toolkit"

const todosSlice = createSlice({
	name: "todos",
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			state.push(action.payload)
		},
		removeTodo: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload)
			if (index !== -1) {
				state.splice(index, 1)
			}
		},
		toggleTodo: (state, action) => {
			const todo = state.find((todo) => todo.id === action.payload)
			if (todo) {
				todo.completed = !todo.completed
			}
		},
		editTodo: (state, action) => {
			const todo = state.find((todo) => todo.id === action.payload.id)
			if (todo) {
				todo.text = action.payload.text
			}
		},
	},
})

export const { addTodo, removeTodo, toggleTodo, editTodo } = todosSlice.actions
export default todosSlice.reducer
