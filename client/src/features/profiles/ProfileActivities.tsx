import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import MiniActivityCard from "../../app/shared/components/MiniActivityCard";

export default function ProfileActivities() {
	const [state, setState] = useState(0);
	const {id} = useParams();
	const tabContent = [
		{ label: "future events", value: "future" },
		{ label: "past events", value: "past" },
		{ label: "hosting", value: "hosting" },
	]
	
	const {userActivities, isLoadingUserActivities} = useProfile(id, undefined, tabContent[state].value);

	return (
		<>
			<Tabs
				value={state}
				onChange={(_, val) => setState(val)}
			>
				{tabContent.map(tab => (
					<Tab key={tab.label} label={tab.label} />
				))}
			</Tabs>

			{isLoadingUserActivities ? (
				<CircularProgress />
			): (userActivities == null || userActivities.length == 0) ? (
				<Typography>There are no activities here</Typography>
			) : (
			<Box display='flex' gap={3} mt={3} >
					{userActivities.map(activity => (
						<MiniActivityCard key={activity.id} activity={activity}/>
					))}
				</Box>
			)}
		</>
	)
}