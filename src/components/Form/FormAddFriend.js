import BaseInput from "./Input/BaseInput"
import { Card, Button, Spacer, Text, Input } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"
import PopoverSelect from "./Input/PopoverSelect"
import { useState } from "react"
import SelectCountryState from "./Input/SelectCountryState"
import styles from "./form.module.css"
import classNames from "classnames/bind"
import friendApi from "@/api/friendApi"
import ActionFriend from "./Input/ActionFriend"

const cx = classNames.bind(styles)

function FormAddFriend() {
	const [profile, setProfile] = useState(null)

	const [disabledBtn, setDisabledBtn] = useState(false)
	const [disabledContact, setDisabledContact] = useState(false)

	const onSearch = (formatPhonenumber) => {
		setDisabledBtn(true)

		friendApi
			.findFriend(formatPhonenumber)
			.then((response) => {
				setDisabledBtn(false)
				const { data } = response
				console.log(data)
				setProfile(data)
			})
			.catch((error) => {
				setProfile(null)
			})
	}

	const sendFriendInvitations = () => {
		setDisabledBtn(true)
		friendApi
			.addFriend(profile.userId)
			.then((response) => {
				setDisabledBtn(false)
				const { data } = response
				setProfile((profile) => {
					return {
						...profile,
						status: data.status,
					}
				})
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const deleteFriendRequest = () => {
		setDisabledBtn(true)
		friendApi
			.deleteFriendRequest(profile.userRequestId, profile.userAcceptId)
			.then((response) => {
				setDisabledBtn(false)
				const { data } = response
				setProfile((profile) => {
					return {
						...profile,
						status: data.status,
					}
				})
			})
			.catch((error) => {
				console.log(error)
			})
	}
	const unfriend = () => {
		setDisabledBtn(true)
		friendApi
			.unfriend(profile.userRequestId, profile.userAcceptId)
			.then((response) => {
				setDisabledBtn(false)
				const { data } = response
				setProfile((profile) => {
					return {
						...profile,
						status: data.status,
					}
				})
			})
			.catch((error) => {
				console.log(error)
			})
	}
	const agreeFriend = () => {
		setDisabledBtn(true)
		friendApi
			.agreeFriend(profile.userRequestId, profile.userAcceptId)
			.then((response) => {
				setDisabledBtn(false)
				const { data } = response
				setProfile((profile) => {
					return {
						...profile,
						status: data.status,
					}
				})
			})
			.catch((error) => {
				console.log(error)
			})
	}
	const contactMessage = (userId) => {}

	return (
		<>
			<Text id="modal-title" size={18} style={{ textAlign: "center" }}>
				Add Friends
			</Text>

			<SelectCountryState onSearch={onSearch} />

			<div className={cx("wrap_userResult")}>
				<ActionFriend
					profile={profile}
					sendFriendInvitations={sendFriendInvitations}
					deleteFriendRequest={deleteFriendRequest}
					unfriend={unfriend}
					agreeFriend={agreeFriend}
					disabledBtn={disabledBtn}
					contactMessage={contactMessage}
					disabledContact={disabledContact}
				/>
			</div>
		</>
	)
}

export default FormAddFriend
