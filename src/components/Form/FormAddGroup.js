import BaseInput from "./Input/BaseInput"
import { Card, Button, Spacer, Text, Input, Image } from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"
import PopoverSelect from "./Input/PopoverSelect"
import { useState, useEffect } from "react"
import SelectCountryState from "./Input/SelectCountryState"
import styles from "./form.module.css"
import classNames from "classnames/bind"
import friendApi from "@/api/friendApi"
import ActionFriend from "./Input/ActionFriend"
import { responsive } from "@cloudinary/react"
import ActionGroup from "./Input/ActionGroup"
import FormSearchFriend from "./FormSearchFriend"
import chatApi from "@/api/chatApi"

const cx = classNames.bind(styles)

function FormAddGroup() {
	const [groupName, setGroupName] = useState("")
	const [keySearch, setKeySearch] = useState("")
	const [avatarGroup, setAvatarGroup] = useState("/images/group.png")
	const [listFriends, setListFriends] = useState([])
	const [viewListFriends, setViewListFriends] = useState([])
	const [profile, setProfile] = useState()
	const [members, setMembers] = useState([])
	const [search, setSearch] = useState("")

	useEffect(() => {
		friendApi
			.listFriend()
			.then((response) => {
				const { data } = response
				setListFriends(data.friends)
				setViewListFriends(data.friends)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const addMember = (member) => {
		const viewListFriends = listFriends.filter((friend) => {
			const userId = friend.userProfile.userId
			return ![...members, member].find((member) => member.userId == userId)
		})

		setMembers((state) => {
			return [...state, member]
		})
		setViewListFriends(viewListFriends)

		if (search) {
			const viewListFriends = listFriends.filter((friend) => {
				let { fullName, phoneNumber } = friend.userProfile
				fullName = fullName.toLowerCase()
				return fullName.includes(search) || phoneNumber.includes(search)
			})
			setViewListFriends(viewListFriends)
		} else {
			setProfile(listFriends)
		}
	}

	const removeMember = (userId) => {
		const newMembers = members.filter((member) => member.userId != userId)
		setMembers(newMembers)

		const viewListFriends = listFriends.filter((friend) => {
			const userId = friend.userProfile.userId
			return !newMembers.find((member) => member.userId == userId)
		})

		setViewListFriends(viewListFriends)

		if (search) {
			const viewListFriends = listFriends.filter((friend) => {
				let { fullName, phoneNumber } = friend.userProfile
				fullName = fullName.toLowerCase()
				return fullName.includes(search) || phoneNumber.includes(search)
			})
			setViewListFriends(viewListFriends)
		} else {
			setProfile(listFriends)
		}
	}
	const searchFriend = (ev) => {
		setSearch(ev.target.value)
		const search = ev.target.value.toLowerCase()

		if (search) {
			const viewListFriends = listFriends.filter((friend) => {
				let { fullName, phoneNumber } = friend.userProfile
				fullName = fullName.toLowerCase()
				return fullName.includes(search) || phoneNumber.includes(search)
			})
			setViewListFriends(viewListFriends)
		} else {
			setProfile(listFriends)
		}
	}

	const submit = () => {
		if (!groupName.trim()) {
			alert("Vui lòng nhập tên Group")
			return
		}
		const data = {
			avatar: avatarGroup,
			groupName,
			members: members.map((member) => member.userId),
		}
		console.log(data)
		chatApi
			.createGroup(data)
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})
	}
	return (
		<>
			<Text id="modal-title" size={18} style={{ textAlign: "center" }}>
				Add Group
			</Text>
			<div className={cx("wrap_info_group")}>
				<Input
					width="240px"
					className={cx("input_groupname")}
					underlined
					placeholder="Group Name"
					onChange={(e) => {
						setGroupName(e.target.value)
					}}
				/>
				<Image
					className={cx("avatar-gropup")}
					src={avatarGroup}
					width={46}
					height={46}
				/>
			</div>

			<Input underlined placeholder="Search friends" onChange={searchFriend} />

			<div className={cx("list_member")}>
				{viewListFriends.map((member, index) => {
					return (
						<ActionGroup
							key={index}
							info={member.userProfile}
							addMember={addMember}
						/>
					)
				})}
			</div>
			{members.length > 0 && (
				<>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							paddingBottom: 12,
							paddingRight: 12,
						}}
					>
						<Text>Thành Viên ( {members.length} )</Text>
						<Button
							auto
							className={cx("add-friend")}
							size="sm"
							disabled={members.length < 2}
							onClick={submit}
						>
							Create
						</Button>
					</div>
					<div className={cx("list_member")}>
						{members.map((member, index) => {
							return (
								<ActionGroup
									key={index}
									info={member}
									removeMember={removeMember}
								/>
							)
						})}
					</div>
				</>
			)}
		</>
	)
}

export default FormAddGroup
