import { Text, Input, Radio } from "@nextui-org/react"
import Select from "react-select"
import maritals from "@/common/maritals"
import { useRef } from "react"
import classNames from "classnames/bind"
import styles from "../../profile.module.css"
import genders from "@/common/gender"
const cx = classNames.bind(styles)

function InputInfo({
	icon,
	value,
	type = "text",
	onChange,
	disabled = false,
	placeholder = "",
}) {
	const selectRef = useRef(null)
	const handleInput = (ev) => {
		onChange(ev?.target?.value || ev)
	}

	const handleMarital = (ev) => {
		onChange(ev.value)
	}

	return (
		<div style={{ padding: "12px 0", display: "flex", alignItems: "center" }}>
			<Text b style={{ width: 32 }}>
				{icon}
			</Text>
			{type != "gender" && type != "marital" && (
				<Input
					placeholder={placeholder}
					disabled={disabled}
					initialValue={value}
					css={{ flex: 1 }}
					type={type}
					onChange={handleInput}
				/>
			)}
			{type == "gender" && (
				<Radio.Group
					orientation="horizontal"
					value={value}
					size="xs"
					onChange={handleInput}
				>
					{genders.map((el) => {
						return (
							<Radio value={el.value} key={el.value}>
								{el.label}
							</Radio>
						)
					})}
				</Radio.Group>
			)}
			{type == "marital" && (
				<Select
					className={cx("select-marital")}
					options={maritals}
					onChange={handleMarital}
					ref={selectRef}
					defaultValue={maritals[0]}
					value={maritals.find((marital) => marital.value == value)}
				/>
			)}
		</div>
	)
}

export default InputInfo
