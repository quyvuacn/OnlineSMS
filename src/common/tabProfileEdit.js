import Overview from "@/components/Profile/Tab/Overview"
import LifeEvents from "@/components/Profile/Tab/LifeEvents"
import More from "@/components/Profile/Tab/More"

export default [
	{
		tabName: "Overview",
		key: "overview",
		icon: <i className="fa-regular fa-user"></i>,
		componentContent: <Overview />,
	},
	{
		tabName: "Life events and expertise",
		key: "fife_events",
		icon: <i className="fa-regular fa-timeline-arrow"></i>,
		componentContent: <LifeEvents />,
	},
	{
		tabName: "More",
		key: "more",
		icon: <i className="fa-regular fa-circle-info"></i>,
		componentContent: <More />,
	},
]
