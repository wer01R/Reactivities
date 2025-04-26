import { Person } from "@mui/icons-material"
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material"
import { Link } from "react-router"

type Props = {
	profile: Profile
	onMouseEnter: React.MouseEventHandler<HTMLAnchorElement>
	onMouseLeave: React.MouseEventHandler<HTMLAnchorElement>
}

export default function ProfileCard({profile, onMouseEnter, onMouseLeave} : Props) {
	return (
		<Link 
			to={`/profiles/${profile.id}`} 
			style={{textDecoration: 'none'}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
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
					sx={{width: '100%', zIndex: 50}}
					alt={profile.displayName + ' image'}
				/>
				<CardContent>
					<Box display='flex' flexDirection='column' gap={1}>
						<Typography variant="h5">{profile.displayName}</Typography>
						{profile.bio && (
							<Typography
								variant="body2"
								textOverflow='ellipsis'
								overflow='hidden'
								whiteSpace='nowrap'
							>
								{profile.bio}
							</Typography>
						)}
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