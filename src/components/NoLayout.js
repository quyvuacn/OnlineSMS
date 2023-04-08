import Sidebar from "./Sidebar"
import Notification from "./Toast/Notification"

function NoLayout({ children }) {
	return (
		<>
			<Notification />
			{children}
		</>
	)
}

export default NoLayout
