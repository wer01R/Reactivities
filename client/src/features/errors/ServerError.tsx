import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router"

export default function ServerError() {
	const { state } = useLocation();
	return (
		<Paper sx={{minHeight: "100vh", mb: "2rem"}}>
			{state?.error ? (
				<>
					<Typography gutterBottom variant="h3" sx={{ px: 4, pt: 2 }} color="secondary">
						{state.error.message || "There has been an error"}
					</Typography>
					<Divider />
					<Typography variant="body1" sx={{ p: 4, maxWidth: "100%", overflow: 'scroll' }}>
						{state.error.detail || "Internet server error"}
					</Typography>
				</>
			) : (
				<Typography variant="h5">Server Error</Typography>
			)}
		</Paper>
	)
}