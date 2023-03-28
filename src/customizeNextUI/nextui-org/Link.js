import { Link as UILink } from "@nextui-org/react"
import { default as NextLink } from "next/link"

function Link(props) {
	const { href, children } = props

	return (
		<UILink as={NextLink} href={href} {...props}>
			{children}
		</UILink>
	)
}

export default Link
