import BaseContent from "./BaseContent"
import { useState, useEffect } from "react"

import classNames from "classnames/bind"
import styles from "./friendship.module.css"
import { Text } from "@nextui-org/react"
import friendApi from "@/api/friendApi"
const cx = classNames.bind(styles)

function FriendshipAcceptItem({ friendAccept }) {
	return (
		<div className={cx("friendship-accept-item")}>
			<div></div>
		</div>
	)
}

export default FriendshipAcceptItem
