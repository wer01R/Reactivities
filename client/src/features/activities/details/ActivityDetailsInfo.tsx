import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid2, Paper, Typography } from "@mui/material";
import { formatDate } from "../../../lib/util/util";
import { useState } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";

export default function ActivityDetailsInfo({ activity }: { activity: Activity }) {
	const [mapOpen, setMapOpen] = useState(false);

	return (
		<Paper sx={{ mb: 2 }}>

			<Grid2 container alignItems="center" pl={2} py={1} spacing={6}>
				<Grid2 size={1} justifySelf={'center'}>
					<Info color="info" fontSize="large" />
				</Grid2>
				<Grid2 size={{md: 11, xs: 9}}>
					<Typography>{activity.description}</Typography>
				</Grid2>
			</Grid2>

			<Divider />

			<Grid2 container alignItems="center" pl={2} py={1} spacing={6}> 
				<Grid2 size={1}>
					<CalendarToday color="info" fontSize="large" />
				</Grid2>
				<Grid2 size={{md: 11, xs: 9}}>
					<Typography>{formatDate(activity.date)}</Typography>
				</Grid2>
			</Grid2>
			<Divider />

			<Grid2 container alignItems="center" pl={2} py={1} spacing={6}>
				<Grid2 size={1}>
					<Place color="info" fontSize="large" />
				</Grid2>
				<Grid2 size={{md: 11, xs: 10}} display='flex' justifyContent='space-between' >
					<Typography>
						{activity.venue}, {activity.city}
					</Typography>
					<Button sx={{whiteSpace: 'nowrap', mx: 3, padding: 0}} onClick={() => setMapOpen(!mapOpen)}>
						{mapOpen ? 'Hide map' : 'Show map'}
					</Button>
				</Grid2>
			</Grid2>
			{mapOpen && (
				<Box sx={{height: 400, zIndex: 1000, display: 'block'}}>
					<MapComponent position={[activity.latitude, activity.longitude]} venue={activity.venue} />
				</Box>
			)}
		</Paper>
	)
}
