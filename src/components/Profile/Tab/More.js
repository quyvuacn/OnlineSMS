import { Button, Text } from "@nextui-org/react"
import ModalHobbie from "./components/ModalHobbie"
import ModalCuisine from "./components/ModalCuisine"
import { useEffect, useState } from "react"
import { profileUser } from "@/api/profileApi"
import { useRouter } from "next/router"
import { notify } from "@/redux/reducers/notificationSlice"
import { useDispatch, useSelector } from "react-redux"
import typeNotification from "@/common/typeNotification"

function More() {
	const [hobbies, setHobbies] = useState([])
	const [cuisines, setCuisines] = useState([])
	const router = useRouter()
	const dispatch = useDispatch()

	const showBtnAdd =
		router.asPath === "/profile/edit" ||
		router.asPath === "/profile/self" ||
		router.asPath === "/profile"

	useEffect(() => {
		profileUser
			.getMoreProfile()
			.then((response) => {
				const { data } = response
				setCuisines(data.cuisines)
				setHobbies(data.hobbies)
			})
			.catch((err) => {
				dispatch(
					notify({
						message: "Thao tác không thành công",
						type: typeNotification.error,
					}),
				)
			})
	}, [])

	const addDataMore = (data) => {
		const { type, value } = data
		if (type == "hobbie") {
			profileUser
				.createHobbie(value)
				.then((response) => {
					const { data } = response
					console.log(response)
					dispatch(
						notify({
							message: "Thao tác thành công",
							type: typeNotification.success,
						}),
					)
					setHobbies((list) => {
						return [...list, data[type]]
					})
				})
				.catch((err) => {
					dispatch(
						notify({
							message: "Thao tác không thành công",
							type: typeNotification.error,
						}),
					)
				})
		} else if (type == "cuisine") {
			profileUser
				.createCuisin(value)
				.then((response) => {
					const { data } = response
					dispatch(
						notify({
							message: "Thao tác thành công",
							type: typeNotification.success,
						}),
					)
					setCuisines((list) => {
						return [...list, data[type]]
					})
				})
				.catch((err) => {
					dispatch(
						notify({
							message: "Thao tác không thành công",
							type: typeNotification.error,
						}),
					)
				})
		}
	}

	return (
		<div>
			<Text h5 style={{ marginBottom: 12 }}>
				Hobbies
			</Text>

			<div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
				{hobbies.map((el, index) => {
					return (
						<Button
							as={"div"}
							key={index}
							color="#000"
							bordered
							rounded
							auto
							animated={false}
							css={{ borderColor: "#ccc" }}
						>
							{el.name}
						</Button>
					)
				})}
				{showBtnAdd && <ModalHobbie onSubmit={addDataMore} />}
			</div>

			<Text h5 style={{ margin: "12px 0" }}>
				Cuisines
			</Text>

			<div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
				{cuisines.map((el, index) => {
					return (
						<Button
							key={index}
							color="#000"
							bordered
							rounded
							auto
							animated={false}
							css={{ borderColor: "#ccc" }}
						>
							{el.name}
						</Button>
					)
				})}
				{showBtnAdd && <ModalCuisine onSubmit={addDataMore} />}
			</div>
		</div>
	)
}

export default More
