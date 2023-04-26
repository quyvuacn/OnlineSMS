import { Text } from "@nextui-org/react"
import Info from "./components/Info"
function LifeEvents() {
	return (
		<div>
			<Info
				icon={<i className="fa-regular fa-signature"></i>}
				text={"Vũ Viết Quý"}
			/>
			<Info
				icon={<i className="fa-regular fa-calendar-days"></i>}
				text={"09/01/2003"}
			/>
			<Info icon={<i className="fa-regular fa-house"></i>} text={"Thái Bình"} />
			<Info
				icon={<i className="fa-regular fa-envelope"></i>}
				text={"vuvietquyacn@gmail.com"}
			/>
			<Info icon={<i className="fa-regular fa-heart"></i>} text={"Độc thân"} />
		</div>
	)
}

export default LifeEvents
