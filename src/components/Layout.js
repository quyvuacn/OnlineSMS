import Sidebar from "./Sidebar"
import Notification from "./Toast/Notification"

function Layout({ children }) {
	return (
		<>
			<Notification />
			<Sidebar />
			<main id="main">{children}</main>
		</>
	)
}

export default Layout
