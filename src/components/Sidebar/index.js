import { Avatar, Popover, Text } from "@nextui-org/react"
import classNames from "classnames/bind"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./sidebar.module.css"

const cx = classNames.bind(styles)

function Sidebar() {
	const router = useRouter()

	return (
		<nav className={cx("wrap")}>
			<div>
				<div className={cx("user")}>
					<Popover isBordered disableShadow placement="right-top" offset={8}>
						<Popover.Trigger>
							<Avatar
								width={48}
								height={48}
								size="lg"
								as="button"
								css={{ border: "1px solid #fff" }}
								src="https://i.pravatar.cc/150?u=a04258114e29026702d"
								tabIndex={-1}
							/>
						</Popover.Trigger>
						<Popover.Content css={{ borderRadius: "4px" }}>
							<Text css={{ p: "$10" }}>
								This is the content of the popover.
							</Text>
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
				</div>
			</div>
			<div className={cx("tab-bottom")}>
				<Link
					href={"/cloud"}
					className={cx(
						{ active: router.pathname == "/cloud" },
						"tab-top-item",
					)}
				>
					<i className="fa-light fa-cloud"></i>
				</Link>
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
