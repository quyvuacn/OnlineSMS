import Notification from "./Toast/Notification"

function NoLayout({ children }) {
	return (
		<>
			<Notification />
			<main>{children}</main>
		</>
	)
}

export default NoLayout
