import { useEffect, useState } from "react"
import InputInfo from "./components/InputInfo"
import { profileUser } from "@/api/profileApi"
import maritals from "@/common/maritals"
import { notify } from "@/redux/reducers/notificationSlice"
import { useDispatch, useSelector } from "react-redux"
import typeNotification from "@/common/typeNotification"
import Button from "@/customizeNextUI/nextui-org/Button"

function EditOverview() {
	const [fullName, setFullName] = useState("")
	const [gender, setGender] = useState("")
	const [phoneNumber, setPhonenumber] = useState("")
	const [address, setAddress] = useState("")
	const [email, setEmail] = useState("")
	const [dateOfBirth, setDateOfBirth] = useState("")
	const [maritalStatus, setMarital] = useState(maritals[0].value)

	const dispatch = useDispatch()
	useEffect(() => {
		profileUser
			.getProfile()
			.then((response) => {
				const { data } = response
				console.log(data)

				setPhonenumber(data.phoneNumber)
				setEmail(data.email)
				setAddress(data.address)
				setMarital(data.maritalStatus)
				setDateOfBirth(data.dateOfBirth)
				setGender(data.gender)
				setFullName(data.fullName)
			})
			.catch((error) => {
				const { data } = error
				setPhonenumber(data?.phoneNumber)
				setEmail(data?.email)
				setDateOfBirth("1999-01-01")
				setGender("male")
			})
	}, [])

	const updateOverview = () => {
		if (fullName.trim() && address.trim()) {
			console.log(gender)
			profileUser
				.updateOverview({
					fullName,
					gender,
					phoneNumber,
					address,
					email,
					dateOfBirth,
					maritalStatus,
				})
				.then(() => {
					dispatch(
						notify({
							message: "Cập nhật thành công!",
							type: typeNotification.success,
						}),
					)
				})
				.catch((error) => {
					console.log(error)
					dispatch(
						notify({
							message: "Dữ liệu chưa đúng",
							type: typeNotification.error,
						}),
					)
				})
		} else {
			alert("Hãy điền đủ các trường")
		}
	}

	return (
		<from>
			<InputInfo
				placeholder="Full Name"
				icon={<i className="fa-regular fa-signature"></i>}
				value={fullName}
				onChange={(value) => {
					setFullName(value)
				}}
			/>
			<InputInfo
				icon={<i className="fa-regular fa-venus-mars"></i>}
				value={gender}
				type="gender"
				onChange={(value) => {
					setGender(value)
				}}
			/>
			<InputInfo
				placeholder="Date of Birth"
				icon={<i className="fa-regular fa-calendar-days"></i>}
				value={dateOfBirth}
				type="date"
				onChange={(value) => {
					setDateOfBirth(value)
				}}
			/>
			<InputInfo
				icon={<i className="fa-regular fa-house"></i>}
				value={address}
				placeholder="Address"
				onChange={(value) => {
					setAddress(value)
				}}
			/>
			<InputInfo
				icon={<i className="fa-regular fa-phone"></i>}
				value={phoneNumber}
				disabled={true}
				onChange={(value) => {
					setPhonenumber(value)
				}}
			/>
			<InputInfo
				icon={<i className="fa-regular fa-envelope"></i>}
				value={email}
				disabled={true}
				onChange={(value) => {
					setEmail(value)
				}}
			/>
			<InputInfo
				icon={<i className="fa-regular fa-heart"></i>}
				value={maritalStatus}
				type="marital"
				onChange={(value) => {
					setMarital(value)
				}}
			/>
			<div style={{ display: "flex", gap: 20, marginTop: 12 }}>
				<Button size={"sm"} auto onClick={updateOverview}>
					Save
				</Button>
				<Button size={"sm"} color="error" auto href="/profile/self">
					Cancel
				</Button>
			</div>
		</from>
	)
}

export default EditOverview
