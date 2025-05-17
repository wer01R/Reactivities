import { Grid2, useMediaQuery } from "@mui/material"
import ActivityList from "./ActivityList"
import ActivityFilters from "./ActivityFilters"
import theme from "../../../lib/theme/theme";

export default function ActivityDashboard() {
	const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Grid2 container spacing={3}>
			<Grid2 size={{ xs: 12, md: 8 }}>
				<ActivityList />
			</Grid2>

			{isDownMd ? (
				<></>
			) : (
				<Grid2 size={4} sx={{ position: 'sticky', top: "4.5rem", alignSelf: 'flex-start' }}>
					<ActivityFilters />
				</Grid2>
			)}
		</Grid2>
	)
}