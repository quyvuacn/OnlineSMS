import axios from "axios"
import queryString from "query-string"

const axiosConfig = axios.create({
	baseURL: "http://localhost:5141/api/",
	headers: {
		"content-type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
	},
	paramsSerializer: (params) => queryString.stringify(params),
})
axiosConfig.interceptors.request.use(async (config) => {
	// Handle token here ...
	return config
})
axiosConfig.interceptors.response.use(
	(response) => {
		return response.data || response
	},
	(error) => {
		const { response } = error

		throw response.data || error
	},
)
export default axiosConfig
