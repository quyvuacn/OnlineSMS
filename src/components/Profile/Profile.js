import classNames from "classnames/bind"
import styles from "./profile.module.css"
import { Image } from "@nextui-org/react"
import UploadAvatar from "./UploadAvatar"
import UserProfile from "./UseProfile"
const cx = classNames.bind(styles)

function Profile() {
	return (
		<div className={cx("wrap")}>
			<div
				className={cx("user-bg")}
				style={{ "--url-bg": `url("/images/img2.jpg")` }}
			>
				<UploadAvatar />
			</div>

			<UserProfile />
		</div>
	)
}

export default Profile
