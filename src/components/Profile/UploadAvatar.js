import classNames from "classnames/bind"
import styles from "./profile.module.css"
import Button from "@/customizeNextUI/nextui-org/Button"
const cx = classNames.bind(styles)

function UploadAvatar() {
	return (
		<div>
			<div
				className={cx("avatar")}
				style={{ "--user-avatar": `url("/images/avatar.jpg")` }}
			></div>
			<Button
				as={"label"}
				auto
				className={cx("btn-update-avatar")}
				for="upload-avatar"
			>
				<i class="fa-solid fa-pen"></i>
			</Button>
			<input type="file" hidden id="upload-avatar" />
		</div>
	)
}

export default UploadAvatar
