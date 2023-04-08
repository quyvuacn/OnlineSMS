import { Text } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setVerifycode } from "@/redux/actions/actionFormRegister"

function Countdown({ stateNumber }) {
	const [seconds, setSeconds] = useState(stateNumber)
	const formRegister = useSelector((state) => state.formRegister)
	const stateInfo = formRegister["verifyCode"]
	const dispatch = useDispatch()

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((prevSeconds) => prevSeconds - 1)
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (seconds === 0) {
			dispatch(
				setVerifycode({
					isLoading: false,
					isCountdown: false,
					disable: false,
				}),
			)
		}
	}, [seconds])

	return <Text size="$xs">{seconds} s</Text>
}

export default Countdown
