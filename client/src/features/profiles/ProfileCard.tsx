import { Person } from "@mui/icons-material"
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material"
import { Link } from "react-router"

type Props = {
	profile: Profile
}

export default function ProfileCard({profile} : Props) {
	return (
		<Link to={`profiles/${profile.imageUrl}`} style={{textDecoration: 'none'}}>
			<Card
				sx={{
					borderRadius: 3,
					p: 3,
					maxWidth: 300,
					textDecoration: 'none'
				}}
				elevation={4}
			>
				<CardMedia 
					component={'img'}
					src={profile?.imageUrl || 'images/user.png'}
					sx={{width: 200, zIndex: 50}}
					alt={profile.displayName + ' image'}
				/>
				<CardContent>
					<Box display='flex' gap={1}>
						<Typography variant="h5">{profile.displayName}</Typography>
						<Chip size="small" variant="outlined" 
							label='Following' color="secondary"/>
					</Box>
				</CardContent>

				<Divider sx={{mx: 2}}/>
				<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<Person />
					<Typography sx={{ml: 1}}>20 Followers</Typography>
				</Box>
			</Card>
		</Link>
	)
}