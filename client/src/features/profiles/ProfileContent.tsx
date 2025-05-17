import { Box, Paper, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useState } from "react"
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";
import theme from "../../lib/theme/theme";

export default function ProfileContent() {
	const [value, setValue] = useState(0);
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const tabContent = [
		{label: 'About', content: <ProfileAbout /> },
		{label: 'Photo', content: <ProfilePhotos />},
		{label: 'Event', content: <ProfileActivities />},
		{label: 'Followers', content: <ProfileFollowings activeTab={value}/>},
		{label: 'Following', content: <ProfileFollowings activeTab={value}/>},
	]

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	}

	return (
		<Box
			component={Paper}
			mt={2}
			p={3}
			elevation={3}
			minHeight="75vh"
			sx={{display: 'flex', flexDirection: isDownMd ? 'column' : 'row', alignItems: 'flex-start', borderRadius: 3}}
		>
			<Tabs
				orientation={isDownMd ? "horizontal" : "vertical"}
				value={value}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				allowScrollButtonsMobile
				sx={{
					flexShrink: 0,
					maxWidth: "100%",
					overflow: "auto"
				}}
			>
				{tabContent.map((tab, index) => (
					<Tab key={index} label={tab.label} />
				))}
			</Tabs>
			<Box sx={{flexGlow: 1, p: 3, width: "100%"}}>
				{tabContent[value].content}
			</Box>
		</Box>
	)
}