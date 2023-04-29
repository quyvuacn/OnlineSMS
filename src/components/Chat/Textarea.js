import classNames from "classnames/bind"
import { useState, useEffect, useRef } from "react"
import styles from "./chat.module.css"
const cx = classNames.bind(styles)

function Textarea({
	placeholder = "",
	className,
	onInput,
	rows,
	cols,
	message,
}) {
	const ref = useRef()

	useEffect(() => {
		const el = ref.current
		if (!el.value) {
			el.style.height = "24px"
		}
	})

	return (
		<textarea
			ref={ref}
			className={className}
			onInput={onInput}
			placeholder={placeholder}
			value={message}
		/>
	)
}

export default Textarea
