import { Button as NextButton } from "@nextui-org/react"
import Link from "next/link"

function Button(props) {
	const { href, children } = props
	return (
		<NextButton as={href ? Link : "button"} {...props}>
			{children}
		</NextButton>
	)
}

export default Button
