import classNames from "classnames/bind"
import { useState, useEffect, useRef } from "react"
import styles from "./chat.module.css"
const cx = classNames.bind(styles)

function Textarea({
	placeholder = "",
	className,
	onChange,
	rows,
	cols,
	message,
}) {
	const onInput = (ev) => {
		onChange(ev)

		const el = ev.target
		console.log(message)
		const scrollHeight = ev.target.value ? ev.target.scrollHeight : 0

		console.log(scrollHeight)
		el.setAttribute("style", "height:" + scrollHeight + "px;overflow-y:hidden;")
		el.style.height = 0
		el.style.height = el.scrollHeight + "px"
	}

	return (
		<textarea
			className={className}
			onInput={onInput}
			rows={rows}
			cols={cols}
			placeholder={placeholder}
			value={message}
		/>
	)
}

export default Textarea
