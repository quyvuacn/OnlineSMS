import { Button, Text } from "@nextui-org/react"
import styles from "../form.module.css"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

function ActionFriend({
	profile,
	sendFriendInvitations,
	deleteFriendRequest,
	unfriend,
	disabledBtn,
	agreeFriend,
	contactMessage,
	disabledContact,
}) {
	let BtnAction = <></>

	if (profile && !profile.isYourself) {
		if (profile.status == 2) {
			BtnAction = (
				<>
					<Button
						auto
						className={cx("add-friend")}
						size="sm"
						onClick={sendFriendInvitations}
						disabled={disabledBtn}
					>
						Add friend
					</Button>
				</>
			)
		} else if (profile.status == 0) {
			BtnAction = (
				<>
					<Button
						auto
						className={cx("add-friend")}
						size="sm"
						onClick={deleteFriendRequest}
						disabled={disabledBtn}
					>
						Xóa lời mời
					</Button>
					{profile.myUserId == profile.userAcceptId && (
						<Button
							auto
							className={cx("add-friend")}
							size="sm"
							onClick={agreeFriend}
							disabled={disabledBtn}
						>
							Đồng ý
						</Button>
					)}
				</>
			)
		} else if (profile.status == 1) {
			BtnAction = (
				<>
					<Button
						auto
						className={cx("add-friend")}
						size="sm"
						onClick={unfriend}
						disabled={disabledBtn}
					>
						Hủy Kết Bạn
					</Button>
				</>
			)
		}
	}

	console.log(profile)
	return (
		<>
			{profile ? (
				<>
					<div className={cx("userResult_info")}>
						<img src={profile.avatar || "/images/default-avatar.png"} alt="" />
						<div>
							<Text size="$sm">
								{profile.isYourself ? "You" : profile.fullName}
							</Text>
							<Text span size="$xs">
								{profile.phoneNumber}
							</Text>
						</div>
					</div>

					{BtnAction}
				</>
			) : (
				<Text></Text>
			)}
		</>
	)
}

export default ActionFriend
