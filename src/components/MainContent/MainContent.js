import classNames from "classnames/bind"
import styles from "./main.module.css"
const cx = classNames.bind(styles)

function MainContent({ children }) {
	return <div className={cx("wrap")}>
		{ children }
	</div>
}

export default MainContent
