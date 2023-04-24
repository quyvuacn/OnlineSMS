import classNames from "classnames/bind"
import styles from "./base-content.module.css"
import { useSelector } from "react-redux"
import { Text } from "@nextui-org/react"
const cx = classNames.bind(styles)

function BaseContent({ children }) {
	const tab = useSelector((state) => state.tab)

	return (
		<div className={cx("wrap")}>
			<div className={cx("header")}>
				<Text b>
					<span className={cx("icon")}>{tab.icon}</span>
					{tab.tabName}
				</Text>
			</div>
			<div className={cx("main-content")}>{children}</div>
		</div>
	)
}

export default BaseContent
