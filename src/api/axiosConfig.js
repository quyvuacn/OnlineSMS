import axios from "axios"
import { cookies } from "next/headers"

const axiosConfig = axios.create({
	baseURL: "http://localhost:5141/api/",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
})

axiosConfig.interceptors.request.use((config) => {
	const cookieStore = cookies()
	const token = cookieStore.get("token")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

axiosConfig.interceptors.request.use(
	(response) => {
		if (response && response.data) {
			return response.data
		}
		return response
	},
	(error) => {
		const { response, message } = error
		throw error
	},
)

export default axiosConfig
