import { Text } from "@nextui-org/react"

function ValidFeedback({
	message = "Not be empty",
	isValid = true,
	hidden = true,
}) {
	return (
		<>
			<Text
				size="$xs"
				css={{
					color: isValid ? "$error" : "$success",
					visibility: hidden ? "hidden" : "visible",
					marginLeft: "10px",
				}}
			>
				{message}
			</Text>
		</>
	)
}

export default ValidFeedback
