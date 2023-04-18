import { Text, Input } from "@nextui-org/react"

function Info({ icon, text, type = "text" }) {
	return (
		<div style={{ padding: "12px 0" }}>
			<Text b style={{ marginRight: 16 }}>
				{icon}
			</Text>
			<Text b>{text}</Text>
		</div>
	)
}

export default Info
