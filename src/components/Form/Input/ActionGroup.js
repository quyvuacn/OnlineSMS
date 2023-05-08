import { Button, Text } from "@nextui-org/react"
import styles from "../form.module.css"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

function ActionGroup({ info, addMember, removeMember }) {
	return (
		<div className={cx("wrap_userResult")}>
			<div className={cx("userResult_info")}>
				<img src={info.avatar || "/images/default-avatar.png"} alt="" />
				<div>
					<Text size="$sm">{info.isYourself ? "You" : info.fullName}</Text>
					<Text span size="$xs">
						{info.phoneNumber}
					</Text>
				</div>
			</div>
			{addMember && (
				<Button
					auto
					className={cx("add-friend")}
					size="sm"
					onClick={() => {
						if (typeof addMember == "function") addMember(info)
					}}
				>
					Add
				</Button>
			)}

			{removeMember && (
				<Button
					auto
					className={cx("add-friend")}
					size="sm"
					color="error"
					onClick={() => {
						if (typeof removeMember == "function") removeMember(info.userId)
					}}
				>
					Delete
				</Button>
			)}
		</div>
	)
}

export default ActionGroup
