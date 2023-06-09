import { Avatar, Popover, Text } from "@nextui-org/react"
import classNames from "classnames/bind"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./sidebar.module.css"
import MenuUser from "./MenuUser"

const cx = classNames.bind(styles)

function Sidebar() {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const user = useSelector((state) => state.user)

	return (
		<nav className={cx("wrap")}>
			<div>
				<div className={cx("user")}>
					<Popover
						isBordered
						disableShadow
						placement="right-top"
						offset={8}
						isOpen={open}
						shouldCloseOnInteractOutside={() => {
							setOpen(false)
						}}
					>
						<Popover.Trigger>
							<Avatar
								width={48}
								height={48}
								size="lg"
								as="button"
								css={{ border: "1px solid #fff" }}
								src={user.avatar ?? "/images/default-avatar.png"}
								tabIndex={-1}
								onClick={() => {
									setOpen(!open)
								}}
							/>
						</Popover.Trigger>
						<Popover.Content css={{ borderRadius: "4px" }}>
							<MenuUser setOpen={setOpen} />
						</Popover.Content>
					</Popover>
				</div>
				<div className={cx("tab-top")}>
					<Link
						href={"/chat"}
						className={cx(
							{ active: router.pathname == "/chat" },
							"tab-top-item",
						)}
					>
						<i className="fa-light fa-comments"></i>
					</Link>
					<Link
						href={"/friends"}
						className={cx(
							{ active: router.pathname == "/friends" },
							"tab-top-item",
						)}
					>
						<i className="fa-light fa-book-user"></i>
					</Link>
					{/* <Link
						href={"/todos"}
						className={cx(
							{ active: router.pathname == "/todos" },
							"tab-top-item",
						)}
					>
						<i className="fa-light fa-square-check"></i>
					</Link> */}
				</div>
			</div>
			<div className={cx("tab-bottom")}>
				{/* <Link
					href={"/cloud"}
					className={cx(
						{ active: router.pathname == "/cloud" },
						"tab-top-item",
					)}
				>
					<i className="fa-light fa-cloud"></i>
				</Link> */}
				<Popover isBordered disableShadow placement="top-left" offset={0}>
					<Popover.Trigger>
						<div className={cx("tab-top-item")} style={{ cursor: "pointer" }}>
							<i className="fa-light fa-gear"></i>
						</div>
					</Popover.Trigger>
					<Popover.Content css={{ borderRadius: "4px" }}>
						<Text css={{ p: "$10" }}>This is the content of the popover.</Text>
					</Popover.Content>
				</Popover>
			</div>
		</nav>
	)
}

export default Sidebar
