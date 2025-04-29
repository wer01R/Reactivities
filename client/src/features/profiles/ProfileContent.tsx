import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react"
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";

export default function ProfileContent() {
	const [value, setValue] = useState(0);
	const tabContent = [
		{label: 'About', content: <ProfileAbout /> },
		{label: 'Photo', content: <ProfilePhotos />},
		{label: 'Event', content: <div>Event</div>},
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
			sx={{display: 'flex', alignItems: 'flex-start', borderRadius: 3}}
		>
			<Tabs
				orientation="vertical"
				value={value}
				onChange={handleChange}
				sx={{borderRadius: 1, height: 450, flexShrink: 0}}
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