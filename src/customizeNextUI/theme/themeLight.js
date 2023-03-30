import { createTheme } from "@nextui-org/react"

export default createTheme({
	type: "light",
	theme: {
		colors: {
			myColor: "#ff4ecd",
		},
		space: {
			1: "1px",
		},
		fonts: {},
		radii: {
			base: "8px",
			lg: "8px",
			md: "8px",
		},
		transitions: {
			enteringScreen: 2000,
			leavingScreen: 2000,
			in: 2000,
			out: 2000,
		},
		borderWeights: {
			normal: "1px",
		},
	},
})
