import { NextUIProvider } from "@nextui-org/react"

import Layout from "@/components/Layout"
import "@/styles/globals.css"
import "@/styles/variable.css"
import theme from "@/customizeNextUI/theme"

export default function App({ Component, pageProps }) {
	const getLayout =
		Component.getLayout || ((content) => <Layout>{content}</Layout>)

	return getLayout(
		<NextUIProvider theme={theme.themeLight}>
			<Component {...pageProps} />
		</NextUIProvider>,
	)
}
