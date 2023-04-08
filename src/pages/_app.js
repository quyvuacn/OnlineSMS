import { Provider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"

import Layout from "@/components/Layout"
import "@/styles/globals.css"
import "@/styles/variable.css"
import theme from "@/customizeNextUI/theme"
import store from "@/redux/store"


export default function App({ Component, pageProps }) {
	
	const AppLayout = Component.layout || Layout

	return (
		<Provider store={store}>
			<NextUIProvider theme={theme.themeLight}>
				<AppLayout>
					<Component {...pageProps} />
				</AppLayout>
			</NextUIProvider>
		</Provider>
	)
}
