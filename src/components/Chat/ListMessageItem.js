import classNames from "classnames/bind"
import styles from "./chat.module.css"
import MessageItem from "./MessageItem"
import { getCookies, setCookie, deleteCookie } from "cookies-next"
import { useSelector } from "react-redux"
import { getFormattedDate, isToday, isYesterday } from "@/utils/FormatDate"
import { Text } from "@nextui-org/react"

const cx = classNames.bind(styles)

function ListMessageItem({ boxchatId }) {
	const userId = getCookies()["userId"]
	const boxChatMessages = useSelector((state) => state.boxChat)

	const listMessage = boxChatMessages[boxchatId]?.listMessage || []

	const eventsByDay =
		listMessage.reduce((acc, message) => {
			const startDate = new Date(message.startDate)

			let dateKey = getFormattedDate(message.startDate)

			if (isToday(startDate)) {
				console.log(isToday(startDate))

				dateKey = "Hôm nay"
			}
			if (isYesterday(startDate)) {
				dateKey = "Hôm qua"
			}

			acc[dateKey] = acc[dateKey] || []
			acc[dateKey].push({
				...message,
				tooltipTime: dateKey,
			})
			return acc
		}, []) || []

	const dateKeys = Object.keys(eventsByDay)
	return (
		<>
			{dateKeys.map((key) => {
				return (
					<>
						{eventsByDay[key].map((message) => {
							return (
								<MessageItem
									message={message}
									isYourself={userId == message.userSendId}
								/>
							)
						})}
						<Text b style={{ textAlign: "center", margin: "12px 0" }}>
							{key}
						</Text>
					</>
				)
			})}
		</>
	)
}

export default ListMessageItem
