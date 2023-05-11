import BaseContent from "./BaseContent"
import { useState, useEffect, useRef } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"

import classNames from "classnames/bind"
import styles from "./friendship.module.css"
import { Text, Avatar, Button } from "@nextui-org/react"
import friendApi from "@/api/friendApi"
const cx = classNames.bind(styles)

function FriendshipRequestItem({ friendRequest, handleFriendRequests }) {
	const { userProfile } = friendRequest
	console.log(friendRequest)
	const deleteFriendRequest = () => {
		const userRequestId = getCookies().userId
		const userAcceptId = userProfile.userId

		friendApi
			.deleteFriendRequest(userRequestId, userAcceptId)
			.then(() => {
				handleFriendRequests(friendRequest)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div className={cx("friendship-accept-item")}>
			<Avatar
				size="lg"
				src={userProfile.avatar ?? "/images/default-avatar.png"}
			/>
			<div className={cx("base-info")}>
				<Text b style={{ display: "block" }}>
					{userProfile.fullName}
				</Text>
				<Text span size="$sm">
					{userProfile.phoneNumber}
				</Text>
			</div>
			<div className={cx("action")}>
				<Button size="sm" color="error" onClick={deleteFriendRequest}>
					Thu hồi
				</Button>
			</div>
		</div>
	)
}

export default FriendshipRequestItem
