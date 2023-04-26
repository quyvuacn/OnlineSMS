import { Card, Grid, Text } from "@nextui-org/react"
import classNames from "classnames/bind"
import styles from "./profile.module.css"
import tabProfile from "@/common/tabProfile"
import tabProfileEdit from "@/common/tabProfileEdit"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import EditOverview from "./Tab/EditOverview"
const cx = classNames.bind(styles)

function UserProfile({ profile }) {
	const router = useRouter()

	const isTabEdit = router.pathname === "/profile/edit"
	const tabInit = isTabEdit ? tabProfileEdit : tabProfile
	const [tab, setTab] = useState(tabInit[0])
	const handleTab = (indextTab) => {
		setTab(tabInit[indextTab])
	}

	return (
		<div className={cx("wrap_user-profile")}>
			<Grid.Container gap={2}>
				<Grid xs={4}>
					<div style={{ width: "100%" }}>
						<Card>
							<Card.Body>
								<div>
									{tabInit.map((item, index) => {
										return (
											<button
												className={cx("tab", {
													"active-tab": item.key == tab.key,
												})}
												key={item.key}
												onClick={() => {
													handleTab(index)
												}}
											>
												<Text b>
													{item.icon}
													{item.tabName}
												</Text>
											</button>
										)
									})}
								</div>
							</Card.Body>
						</Card>
					</div>
				</Grid>
				<Grid xs={8}>
					<div style={{ width: "100%" }}>
						<Card>
							<Card.Body>
								{!isTabEdit && tab.componentContent}
								{isTabEdit && tab.key == "overview" && <EditOverview />}
								{isTabEdit && tab.key != "overview" && tab.componentContent}
							</Card.Body>
						</Card>
					</div>
				</Grid>
			</Grid.Container>
		</div>
	)
}

export default UserProfile
