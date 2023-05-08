import { Text } from "@nextui-org/react"
import classNames from "classnames/bind"
import styles from "./search.module.css"
const cx = classNames.bind(styles)

function ResultSearch() {
	return (
		<div className={cx("result-seach")}>
			{/* <Text b size="$sm">
				Tìm kiếm gần đây
			</Text> */}
			<div className={cx("list-result")}></div>
		</div>
	)
}

export default ResultSearch
