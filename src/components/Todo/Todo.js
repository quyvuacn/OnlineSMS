function Todo({ todo, onRemove, onToggle, onEdit }) {
	return (
		<div>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() => onToggle(todo.id)}
			/>
			<input
				type="text"
				defaultValue={todo.text}
				onBlur={(e) => onEdit(todo.id, e.target.value)}
			/>
			<button onClick={() => onRemove(todo.id)}>Remove</button>
		</div>
	)
}

export default Todo
