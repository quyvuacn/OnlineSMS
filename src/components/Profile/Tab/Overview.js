import { Text } from "@nextui-org/react"
import Info from "./components/Info"
import classNames from "classnames/bind"
import styles from "../profile.module.css"
import Button from "@/customizeNextUI/nextui-org/Button"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import typeNotification from "@/common/typeNotification"
import maritals from "@/common/maritals"
import { profileUser } from "@/api/profileApi"
import genders from "@/common/gender"

const cx = classNames.bind(styles)

function Overview() {
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
				const date = new Date(data.dateOfBirth)

				setPhonenumber(data.phoneNumber)
				setEmail(data.email)
				setAddress(data.address)
				setMarital(
					maritals.find((marital) => marital.value == maritalStatus).label,
				)
				setDateOfBirth(formatDate(date))
				setGender(
					genders.find((genderItem) => genderItem.value == data.gender).label,
				)
				setFullName(data.fullName)
			})
			.catch((error) => {
				const { data } = error
				setPhonenumber(data.phoneNumber)
				setEmail(data.email)
				setDateOfBirth("1999-01-01")
				setGender("male")
			})
	}, [])

	const formatDate = (date) =>
		`${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
			.toString()
			.padStart(2, "0")}/${date.getFullYear()}`

	return (
		<div className={cx("wrap_overview")}>
			<Info icon={<i class="fa-regular fa-signature"></i>} text={fullName} />
			<Info icon={<i class="fa-regular fa-venus-mars"></i>} text={gender} />
			<Info
				icon={<i class="fa-regular fa-calendar-days"></i>}
				text={dateOfBirth}
			/>
			<Info icon={<i class="fa-regular fa-house"></i>} text={address} />
			<Info icon={<i class="fa-regular fa-phone"></i>} text={phoneNumber} />
			<Info icon={<i class="fa-regular fa-envelope"></i>} text={email} />
			<Info icon={<i class="fa-regular fa-heart"></i>} text={maritalStatus} />
			<Button
				href="/profile/edit"
				auto
				bordered
				rounded
				className={cx("btn-edit_overview")}
			>
				<i class="fa-regular fa-user-pen"></i>
			</Button>
		</div>
	)
}

export default Overview
