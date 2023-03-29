import { Button } from "@nextui-org/react"
import classNames from "classnames/bind"
import { useState } from "react"
import AddFriend from "./AddFriend"
import AddGroup from "./AddGroup"

import ResultSearch from "./ResultSearch"

import styles from "./search.module.css"
const cx = classNames.bind(styles)

function Search({ children }) {
	const [showSearch, setShowSearch] = useState(false)

	return (
		<div className={cx("wrap")}>
			<div className={cx("search")}>
				<label
					className={cx("label", { "border-label": showSearch })}
					for="search"
				>
					<span>
						<i class="fa-sharp fa-light fa-magnifying-glass"></i>
					</span>
					<input
						className={cx("input")}
						type="text"
						id="search"
						autoComplete="off"
						onFocus={() => {
							setShowSearch(true)
						}}
					/>
				</label>
				{!showSearch && (
					<div className={cx("adds")}>
						<AddFriend />
						<AddGroup />
					</div>
				)}
				{showSearch && (
					<Button
						className={cx("close")}
						tabIndex={-1}
						color="#cfd2d5"
						auto
						light
						onClick={() => {
							setShowSearch(false)
						}}
					>
						Đóng
					</Button>
				)}
			</div>

			{showSearch && <ResultSearch />}

			{!showSearch && <div className={cx("content")}>{children}</div>}
		</div>
	)
}

export default Search
