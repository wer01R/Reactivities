import { Box, Card, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router"
import { formatDate } from "../../../lib/util/util"

type Props = {
	activity: UserActivity
}

export default function MiniActivityCard({ activity }: Props) {
	return (
		<Link 
			style={{textDecoration: 'none'}}
			to={`/activities/${activity.id}`}
		>
			<Card
				sx={{ maxWidth: 200, cursor: 'pointer' }}
				elevation={4}
			>
				<CardMedia
					component="img"
					height={100}
					image={`/images/categoryImages/${activity.category}.jpg`}
					alt={`${activity.category} image`}
				/>
				<Box sx={{ m: 3 }}>
					<Typography
						textAlign='center'
						gutterBottom
						fontWeight='bold'
						whiteSpace='nowrap'
						fontSize={20}
					>{activity.title}</Typography>

					<Typography
						textAlign='center'
						variant="body2"
					>{formatDate(activity.date)}</Typography>
				</Box>
			</Card>
		</Link>
	)
}