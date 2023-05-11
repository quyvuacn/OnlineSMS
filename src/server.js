const { createServer } = require("https")
const { parse } = require("url")
const next = require("next")
const fs = require("fs")
const port = 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = {
	key: fs.readFileSync("./https_cert/localhost+1-key.pem"),
	cert: fs.readFileSync("./https_cert/localhost+1.pem"),
}

app.prepare().then(() => {
	createServer(httpsOptions, (req, res) => {
		const parsedUrl = parse(req.url, true)
		handle(req, res, parsedUrl)
	}).listen(port, "192.168.1.8", (err) => {
		if (err) throw err
		console.log("Ready - started server on url: https://192.168.1.8:" + port)
	})
})
