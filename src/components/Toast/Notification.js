import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

function Notification() {
	const notification = useSelector((state) => state.notification)
	useEffect(() => {
		console.log("toast")
		toast(notification.message, {
			type: notification.type,
		})
	}, [notification])

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	)
}

export default Notification
