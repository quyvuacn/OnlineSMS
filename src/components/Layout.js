import Sidebar from "./Sidebar"

function Layout({ children }) {
	return (
		<>
			<Sidebar />
			<main id="main">{children}</main>
		</>
	)
}

export default Layout
