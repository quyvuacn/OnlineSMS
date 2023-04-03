import axios from "axios"

const axiosConfig = axios.create({
	baseURL: "http://localhost:3000/api/",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
})

axiosConfig.interceptors.request.use((config) => {
	// Handle token here ...
	// Add headers : Authorization
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
		//Handle error
		throw error
	},
)

export default axiosConfig
