import { Avatar, Card, Input, Popover, Text, Button } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { getCookies, setCookie, deleteCookie } from "cookies-next"
import styles from "./form.module.css"
import classNames from "classnames/bind"
import friendApi from "@/api/friendApi"
import Link from "@/customizeNextUI/nextui-org/Link"
const cx = classNames.bind(styles)

function FormSearchFriend() {
	const [friendOrGroup, setFriendOrGroup] = useState([])
	const [viewFriends, setViewFriends] = useState([])

	const [search, setSearch] = useState("")

	useEffect(() => {
		friendApi
			.listFriend()
			.then((response) => {
				const { data } = response
				setFriendOrGroup(data.friends)
				setViewFriends(data.friends)
				console.log(data.friends)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const handleSearch = (ev) => {
		const search = ev.target.value
		setSearch(search)

		if (search) {
			const viewListFriends = friendOrGroup.filter((friend) => {
				let { fullName, phoneNumber } = friend.userProfile
				fullName = fullName.toLowerCase()
				return fullName.includes(search) || phoneNumber.includes(search)
			})
			setViewFriends(viewListFriends)
		} else {
			setViewFriends(friendOrGroup)
		}
	}

	const unfriend = (userId) => {
		const myUserId = getCookies().userId
		friendApi
			.unfriend(myUserId, userId)
			.then((response) => {
				const updateFriendOrGroup = friendOrGroup.filter(
					(fg) => fg.userProfile.userId != userId,
				)
				setFriendOrGroup(updateFriendOrGroup)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div className={cx("wrap_form-search-friend")}>
			<div className={cx("header")}>
				<Text b size={"$sm"}>
					Bạn bè ({friendOrGroup.length})
				</Text>
				<form>
					<Input
						className={cx("friend-group-input")}
						animated={false}
						size="sm"
						clearable
						bordered
						contentLeft={<i className="fa-light fa-magnifying-glass"></i>}
						placeholder="Name or Phonenumber"
						onChange={handleSearch}
					/>
				</form>
			</div>
			<div className={cx("listdata")}>
				{viewFriends.map((item, index) => (
					<Card
						css={{ p: "$6", marginBottom: 16 }}
						variant="bordered"
						key={index}
					>
						<Card.Body css={{ py: "$2" }}>
							<div className={cx("item-friend")} key={item.id}>
								<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
									<div>
										<Avatar
											src={
												item.userProfile.avatar || "/images/default-avatar.png"
											}
											size="lg"
										/>
									</div>
									<div>
										<Text b css={{ display: "block" }}>
											{item.userProfile.fullName}
										</Text>
										<Text span size="$sm">
											{item.userProfile.phoneNumber}
										</Text>
									</div>
								</div>

								<Popover placement="bottom-right" offset={0}>
									<Popover.Trigger>
										<Button auto animated={false} light>
											<i className="fa-solid fa-square-info"></i>
										</Button>
									</Popover.Trigger>
									<Popover.Content
										css={{ border: "1px solid #ccc", borderRadius: "4px" }}
									>
										<div className={cx("wrap-info-more")}>
											<Link
												className={cx("info-more")}
												href={`/profile/${item.userProfile.userId}`}
												auto
											>
												Xem Thông tin
											</Link>
											<button
												className={cx("info-more")}
												auto
												onClick={() => {
													unfriend(item.userProfile.userId)
												}}
											>
												<Text color="error">Hủy kết bạn</Text>
											</button>
										</div>
									</Popover.Content>
								</Popover>
							</div>
						</Card.Body>
					</Card>
				))}
			</div>
		</div>
	)
}

export default FormSearchFriend
