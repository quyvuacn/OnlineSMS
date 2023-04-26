import Friends from "@/components/Friends/Friends"
import Friendship from "@/components/Friends/Friendship"

const tab = [
	{
		tabName: "Danh sách bạn bè",
		key: "friends",
		icon: <i className="fa-light fa-user"></i>,
		componentContent: <Friends />,
	},
	{
		tabName: "Danh sách nhóm",
		key: "groups",
		icon: <i className="fa-light fa-users"></i>,
		componentContent: <Friends />,
	},
	{
		tabName: "Kết bạn",
		key: "friendship",
		icon: <i className="fa-sharp fa-light fa-mailbox"></i>,
		componentContent: <Friendship />,
	},
]

export default tab
