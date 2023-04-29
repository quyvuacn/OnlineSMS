import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

function Notification() {
	const notification = useSelector((state) => state.notification)

	useEffect(() => {
		if (!notification.showToast) {
		}
		toast(notification.message, {
			type: notification.type,
		})
		return () => {
			toast.clearWaitingQueue()
		}
	}, [notification])

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	)
}

export default Notification
