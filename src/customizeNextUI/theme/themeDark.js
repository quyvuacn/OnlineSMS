import { createTheme } from "@nextui-org/react"

export default createTheme({
	type: "dark", // it could be "light" or "dark"
	theme: {
		colors: {
			myColor: "#ff4ecd",
		},
		space: {},
		fonts: {},
		radii: {
			base: "2px",
			lg: "8px",
			md: "4px",
		},
		transitions: {},
	},
})
