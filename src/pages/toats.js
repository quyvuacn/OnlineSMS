import { useDispatch, useSelector } from "react-redux"
import { notify } from "@/redux/reducers/notificationSlice"

function Toast() {
	const dispatch = useDispatch()
	const showMessage = () => {
		dispatch(
			notify({
				message: "Lỗi đăng nhập",
			}),
		)
	}
	return (
		<>
			<button onClick={showMessage}>Show</button>
		</>
	)
}

export default Toast
