import { createAction } from "@reduxjs/toolkit"

// todos/addTodo :
// todos : state trong store
// addTodo : 1 reducer trong  todos Slice

const addTodo = createAction("todos/addTodo", function (text) {
	return {
		payload: {
			id: new Date().getTime(),
			text,
			completed: false,
		},
	}
})

export default addTodo
