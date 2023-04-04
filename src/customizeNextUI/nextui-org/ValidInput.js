import { Text } from "@nextui-org/react"

function ValidInput({
	message = "Not be empty",
	isValid = true,
	hidden = true,
}) {
	return (
		<>
			<Text
				size="$xs"
				css={{
					color: isValid ? "$success" : "$error",
					visibility: hidden ? "hidden" : "visible",
					marginLeft: "10px",
				}}
			>
				{message}
			</Text>
		</>
	)
}

export default ValidInput
