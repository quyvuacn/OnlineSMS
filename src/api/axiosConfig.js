import axios from "axios"
import queryString from "query-string"
import { getCookies } from "cookies-next"

const baseAxios = (headers) => {
	let objBaseAxios = axios.create({
		// http://192.168.1.8:5141/
		// http://localhost:5141
		baseURL: "http://192.168.1.8:5141/api/",
		headers: {
			"content-type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
			...headers,
		},
		paramsSerializer: (params) => queryString.stringify(params),
	})

	objBaseAxios.interceptors.request.use(async (config) => {
		const { token } = getCookies("token")
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	})
	objBaseAxios.interceptors.response.use(
		(response) => {
			return response.data || response
		},
		(error) => {
			const { response } = error

			throw response.data || error
		},
	)

	return objBaseAxios
}

const axiosConfig = baseAxios({})
export const axiosUploadFile = baseAxios({
	"content-type": "multipart/form-data",
})

export default axiosConfig
