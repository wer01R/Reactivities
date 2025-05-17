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
				gap: {xs: 2, md: 6},
				justifyContent: "center",
				alignContent: "center",
				alignItems: "center",
				height: "100vh",
				width: "100vw",
				backgroundImage: "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)"
			}}
		>
			<Box sx={{
				display: 'flex', 
				flexDirection: {xs: 'column', md: 'row'},
				alignContent: 'center', 
				alignItems: 'center',
				justifyContent: 'center',
				gap: 3
			}}>
				<Group sx={{width: 110, height: 100}}/>
				<Typography variant='h1' textAlign='center'>
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
				sx={{height: {xs: 65, md: 80}, borderRadius: 4, fontSize: {xs: "1rem", md: '1.5rem'}}}
			>
				Take me to the activities
			</Button>
		</Paper>
	)
}