const nextConfig = {
	reactStrictMode: false,
	skipMiddlewareUrlNormalize: true,
	devServer: {
		https: true,
		host: "192.168.1.8",
		port: 3000,
	},
}

module.exports = nextConfig

// IP4 : 192.168.1.8
