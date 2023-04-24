import classNames from "classnames/bind"
import styles from "./tabfriends.module.css"
import { Text } from "@nextui-org/react"
import TabItem from "./TabItem"
import tabFriends from "@/common/tabFriends"
import { useSelector } from "react-redux"

const cx = classNames.bind(styles)

function TabFriends({ handleTabFriends }) {
	const tabFriend = useSelector((state) => state.tab)

	return (
		<div className={cx("wrap")}>
			{tabFriends.map((tab) => {
				return (
					<TabItem
						active={tabFriend.key === tab.key}
						key={tab.key}
						text={tab.tabName}
						icon={tab.icon}
						onClick={() => {
							handleTabFriends(tab)
						}}
					/>
				)
			})}
		</div>
	)
}

export default TabFriends
