import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
	return (
		<Paper
			sx={{
				color: "white",
				display: "flex",
				flexDirection: "column",
				gap: 6,
				justifyContent: "center",
				alignContent: "center",
				alignItems: "center",
				height: "100vh",
				width: "100vw",
				backgroundImage: "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)"
			}}
		>
			<Box sx={{
				display: 'flex', alignContent: 'center', justifyContent: 'center',
				gap: 3
			}}>
				<Group sx={{width: 110, height: 100}}/>
				<Typography variant='h1'>
					Reactivities
				</Typography>
			</Box>
			<Typography variant="h2">
				Welcome to reactivities
			</Typography>
			<Button
				component={Link}
				to='/activities'
				size='large'
				variant='contained'
				sx={{height: 80, borderRadius: 4, fontSize: '1.5rem'}}
			>
				Take me to the activities
			</Button>
		</Paper>
	)
}