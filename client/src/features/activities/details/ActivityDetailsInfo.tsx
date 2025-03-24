import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Divider, Grid2, Paper, Typography } from "@mui/material";

export default function ActivityDetailsInfo() {
	return (
		<Paper sx={{ mb: 2 }}>

			<Grid2 container alignItems="center" pl={2} py={1}>
				<Grid2 size={1} justifySelf={'center'}>
					<Info color="info" fontSize="large" />
				</Grid2>
				<Grid2 size={11}>
					<Typography>Activity description</Typography>
				</Grid2>
			</Grid2>
			<Divider />
			<Grid2 container alignItems="center" pl={2} py={1}>
				<Grid2 size={1}>
					<CalendarToday color="info" fontSize="large" />
				</Grid2>
				<Grid2 size={11}>
					<Typography>1 Jan 2025 at 1:40pm</Typography>
				</Grid2>
			</Grid2>
			<Divider />

			<Grid2 container alignItems="center" pl={2} py={1}>
				<Grid2 size={1}>
					<Place color="info" fontSize="large" />
				</Grid2>
				<Grid2 size={11}>
					<Typography>
						Venue, City
					</Typography>
				</Grid2>
			</Grid2>
		</Paper>
	)
}
