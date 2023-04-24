import BaseContent from "./BaseContent"
import { useState, useEffect } from "react"

import classNames from "classnames/bind"
import styles from "./friendship.module.css"
import { Text } from "@nextui-org/react"
import friendApi from "@/api/friendApi"
import FriendshipAcceptItem from "./FriendshipAcceptItem"

const cx = classNames.bind(styles)

function Friendship() {
	const [friendAccepts, setFriendAccepts] = useState([])
	const [friendRequests, setFriendRequests] = useState([])

	useEffect(() => {
		friendApi
			.listFriendRequest()
			.then((response) => {
				const { data } = response
				console.log(data)
				setFriendRequests(data.friends)
			})
			.catch((error) => {
				console.log(error)
			})

		friendApi
			.listFriendAccept()
			.then((response) => {
				const { data } = response
				console.log(data)

				setFriendAccepts(data.friends)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

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
							return <FriendshipAcceptItem friendAccept={friendAccept} />
						})}
					</div>
				</div>
				<div className={cx("friendship-request")}>
					<div className={cx("header")}>
						<Text b size={"$sm"}>
							Lời mời đã gửi ({friendRequests.length})
						</Text>
					</div>
				</div>
			</div>
		</BaseContent>
	)
}

export default Friendship
