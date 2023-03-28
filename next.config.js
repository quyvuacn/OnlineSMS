const path = require("path")
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [
			path.join(__dirname, "styles"),
			path.join(__dirname, "components/Search/"),
			path.join(__dirname, "pages"),
		],
	},
}

module.exports = nextConfig
