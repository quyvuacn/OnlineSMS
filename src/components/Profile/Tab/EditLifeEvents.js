import { Text } from "@nextui-org/react"
import Info from "./components/Info"

function EditLifeEvents() {
	return (
		<div>
			<Info
				icon={<i class="fa-regular fa-signature"></i>}
				text={"Vũ Viết Quý"}
			/>
			<Info
				icon={<i class="fa-regular fa-calendar-days"></i>}
				text={"09/01/2003"}
			/>
			<Info icon={<i class="fa-regular fa-house"></i>} text={"Thái Bình"} />
			<Info
				icon={<i class="fa-regular fa-envelope"></i>}
				text={"vuvietquyacn@gmail.com"}
			/>
			<Info icon={<i class="fa-regular fa-heart"></i>} text={"Độc thân"} />
		</div>
	)
}

export default EditLifeEvents
