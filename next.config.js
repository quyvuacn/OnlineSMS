const nextConfig = {
	reactStrictMode: false,
	skipMiddlewareUrlNormalize: true,
	devServer: {
		https: true,
		host: "10.1.26.197",
		port: 3000,
	},
}

module.exports = nextConfig

// IP4 : 192.168.1.8
