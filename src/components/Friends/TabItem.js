import classNames from "classnames/bind"
import styles from "./tabfriends.module.css"
import { Text } from "@nextui-org/react"

const cx = classNames.bind(styles)

function TabItem({ icon, text, onClick, active }) {
	return (
		<div className={cx("tabfriend-item", { active: active })} onClick={onClick}>
			<span>{icon}</span>
			<Text b>{text}</Text>
		</div>
	)
}

export default TabItem
