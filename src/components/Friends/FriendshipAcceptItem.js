import BaseContent from "./BaseContent"
import { useState, useEffect, useRef, useContext } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"

import classNames from "classnames/bind"
import styles from "./friendship.module.css"
import { Text, Avatar, Button } from "@nextui-org/react"
import friendApi from "@/api/friendApi"
import { ConnectionHubContext } from "../ConnectionHub/ConnectionHub"
import { TaskNames } from "@/services/chatHubService"
const cx = classNames.bind(styles)

function FriendshipAcceptItem({ friendAccept, handleFriendAccepts }) {
	const { userProfile } = friendAccept
	const ref = useRef()

	const { reloadBoxChats, connectionHub } = useContext(ConnectionHubContext)

	const deleteFriendRequest = () => {
		const userAcceptId = getCookies().userId
		const userRequestId = userProfile.userId

		friendApi
			.deleteFriendRequest(userRequestId, userAcceptId)
			.then(() => {
				handleFriendAccepts(friendAccept)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const agreeFriend = () => {
		const userAcceptId = getCookies().userId
		const userRequestId = userProfile.userId

		friendApi
			.agreeFriend(userRequestId, userAcceptId)
			.then(() => {
				const data = {
					userTargetId: userRequestId,
				}
				handleFriendAccepts(friendAccept)
				connectionHub.invoke(
					TaskNames.ReloadBoxchats,
					data,
					function (isSuccess) {
						if (isSuccess) {
							console.log("ReloadBoxchats", data)
						}
					},
				)
				reloadBoxChats()
			})
			.catch((error) => {
				console.log(error)
			})
	}
	return (
		<div className={cx("friendship-accept-item")} ref={ref}>
			<Avatar size="lg" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
			<div className={cx("base-info")}>
				<Text b style={{ display: "block" }}>
					{userProfile.fullName}
				</Text>
				<Text span size="$sm">
					{userProfile.phoneNumber}
				</Text>
			</div>
			<div className={cx("action")}>
				<Button size="sm" onClick={agreeFriend}>
					Xác nhận
				</Button>
				<Button size="sm" color="error" onClick={deleteFriendRequest}>
					Từ chối
				</Button>
			</div>
		</div>
	)
}

export default FriendshipAcceptItem
