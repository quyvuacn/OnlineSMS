import BaseContent from "./BaseContent"
import { useState, useEffect } from "react"

import classNames from "classnames/bind"
import styles from "./friendship.module.css"
import { Text } from "@nextui-org/react"
import friendApi from "@/api/friendApi"
import FriendshipAcceptItem from "./FriendshipAcceptItem"
import FriendshipRequestItem from "./FriendshipRequestItem"

const cx = classNames.bind(styles)

function Friendship() {
	const [friendAccepts, setFriendAccepts] = useState([])
	const [friendRequests, setFriendRequests] = useState([])

	useEffect(() => {
		friendApi
			.listFriendRequest()
			.then((response) => {
				const { data } = response
				setFriendRequests(data.friends)
			})
			.catch((error) => {
				console.log(error)
			})

		friendApi
			.listFriendAccept()
			.then((response) => {
				const { data } = response
				setFriendAccepts(data.friends)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const handleFriendAccepts = (friendAccept) => {
		const updatedFriendAccepts = friendAccepts.filter(
			(friend) => friend.id !== friendAccept.id,
		)
		setFriendAccepts(updatedFriendAccepts)
	}
	const handleFriendRequests = (friendRequest) => {
		const updatedFriendRequests = friendRequests.filter(
			(friend) => friend.id !== friendRequest.id,
		)
		setFriendRequests(updatedFriendRequests)
	}

	return (
		<BaseContent>
			<div className={cx("wrap")}>
				<div className={cx("friendship-accept")}>
					<div className={cx("header")}>
						<Text b size={"$sm"}>
							Lời mời kết bạn ({friendAccepts.length})
						</Text>
					</div>
					<div className={cx("list-friendship-accept")}>
						{friendAccepts.map((friendAccept, index) => {
							return (
								<FriendshipAcceptItem
									friendAccept={friendAccept}
									handleFriendAccepts={handleFriendAccepts}
								/>
							)
						})}
					</div>
				</div>
				<div className={cx("friendship-request")}>
					<div className={cx("header")}>
						<Text b size={"$sm"}>
							Lời mời đã gửi ({friendRequests.length})
						</Text>
					</div>
					<div className={cx("list-friendship-accept")}>
						{friendRequests.map((friendRequest, index) => {
							return (
								<FriendshipRequestItem
									friendRequest={friendRequest}
									handleFriendRequests={handleFriendRequests}
								/>
							)
						})}
					</div>
				</div>
			</div>
		</BaseContent>
	)
}

export default Friendship
