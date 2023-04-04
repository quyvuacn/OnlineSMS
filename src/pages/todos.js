import { useSelector, useDispatch } from "react-redux"
import Todo from "@/components/Todo/Todo"
import { removeTodo, toggleTodo, editTodo } from "@/redux/reducers/todosSlice"

import addTodo from "../redux/actions/todos/addTodo"


function Todos() {
	const todos = useSelector((state) => state.todos)
	const dispatch = useDispatch()

	const handleAddTodo = () => {
		const text = prompt("Enter todo text:")
		if (text) {
			dispatch(
				addTodo(text),
			)
		}
	}
	const handleRemoveTodo = (id) => {
		if (window.confirm("Are you sure to remove this todo?")) {
			dispatch(removeTodo(id))
		}
	}

	const handleToggleTodo = (id) => {
		dispatch(toggleTodo(id))
	}

	const handleEditTodo = (id, text) => {
		dispatch(editTodo({ id, text }))
	}

	return (
		<div>
			<h1>Todos:</h1>
			<button onClick={handleAddTodo}>Add Todo</button>
			{todos.map((todo) => (
				<Todo
					key={todo.id}
					todo={todo}
					onRemove={handleRemoveTodo}
					onToggle={handleToggleTodo}
					onEdit={handleEditTodo}
				/>
			))}
		</div>
	)
}

export default Todos
