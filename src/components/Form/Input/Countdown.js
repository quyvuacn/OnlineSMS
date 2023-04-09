import { Text } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setVerifycode } from "@/redux/actions/actionFormRegister"

function Countdown() {
	const formRegister = useSelector((state) => state.formRegister)
	const stateInfo = formRegister["verifyCode"]

	const dispatch = useDispatch()

	useEffect(() => {
		const newCount = stateInfo.count - 1
		const interval = setInterval(() => {
			dispatch(
				setVerifycode({
					count: newCount,
				}),
			)
		}, 1000)
		return () => clearInterval(interval)
	}, [stateInfo])

	useEffect(() => {
		if (stateInfo.count == 0) {
			dispatch(
				setVerifycode({
					isLoading: false,
					isCountdown: false,
					disable: false,
					count: 60,
				}),
			)
		}
	}, [stateInfo])

	return <Text size="$xs">{stateInfo.count} s</Text>
}

export default Countdown
