import { Input as NextInput, styled } from "@nextui-org/react"

function Input(props) {
	const MyInput = styled(NextInput, {
		"&:hover": {
			paddingLeft: "20px",
		},
	})
	return <MyInput {...props} />
}

export default Input
