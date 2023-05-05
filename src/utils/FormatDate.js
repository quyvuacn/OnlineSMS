export const getFormattedDate = (date) => {
	const daysOfWeek = [
		"Chủ nhật",
		"Thứ hai",
		"Thứ ba",
		"Thứ tư",
		"Thứ năm",
		"Thứ sáu",
		"Thứ bảy",
	]
	date = new Date(date)
	const dayOfWeek = daysOfWeek[date.getDay()]
	const day = date.getDate().toString().padStart(2, "0")
	const month = (date.getMonth() + 1).toString().padStart(2, "0")
	const year = date.getFullYear()
	const formattedDate = dayOfWeek + ", " + day + "/" + month + "/" + year
	return formattedDate
}

export const isToday = (dateToCheck) => {
	const today = new Date()

	if (
		dateToCheck.getDate() === today.getDate() &&
		dateToCheck.getMonth() === today.getMonth() &&
		dateToCheck.getFullYear() === today.getFullYear()
	) {
		return true
	} else {
		return false
	}
}

export const isYesterday = (dateToCheck) => {
	const yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)

	if (
		dateToCheck.getDate() === yesterday.getDate() &&
		dateToCheck.getMonth() === yesterday.getMonth() &&
		dateToCheck.getFullYear() === yesterday.getFullYear()
	) {
		return true
	} else {
		return false
	}
}
