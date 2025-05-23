import { Card, CardMedia, Box, Typography, Chip, useMediaQuery } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";
import { UseMutationResult } from "@tanstack/react-query";
import StyledButton from "../../../app/shared/components/StyledButton";
import theme from "../../../lib/theme/theme";

type Props = {
	activity: Activity
	updateAttendance: UseMutationResult<void, Error, void, unknown>
}

export default function ActivityDetailsHeader({activity, updateAttendance} : Props) {
	const isHost = activity.isHost;	
	const isGoing = activity.isGoing;
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
			{activity.isCancelled && (
				<Chip
					sx={{ position: 'absolute', left: 40, top: 20, zIndex: 1000, borderRadius: 1 }}
					color="error"
					label="Cancelled"
				/>
			)}
			<CardMedia
				component="img"
				width={isDownMd ? '80vw' : 'auto'}
				height={isDownMd ? '200' : "300"}
				image={`/images/categoryImages/${activity.category}.jpg`}
				alt={`${activity.category} image`}
			/>
			<Box sx={{
				position: 'absolute',
				bottom: 0,
				width: '100%',
				color: 'white',
				padding: 2,
				display: 'flex',
				flexDirection: isDownMd ? 'column' : 'row',
				justifyContent: 'space-between',
				alignItems: isDownMd ? 'flex-start' : 'flex-end',
				background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
				boxSizing: 'border-box',
			}}>
				{/* Text Section */}
				<Box>
					<Typography variant="h4" sx={{ fontWeight: 'bold' }}>{activity.title}</Typography>
					<Typography variant="subtitle1">{formatDate(activity.date)}</Typography>
					<Typography variant="subtitle2">
						Hosted by <Link to={`/profiles/${activity.hostId}`} style={{ color: 'white', fontWeight: 'bold' }}>
							{activity.hostDisplayName}
						</Link>
					</Typography>
				</Box>

				{/* Buttons aligned to the right */}
				<Box sx={{ display: 'flex', gap: 2, mt: isDownMd ? 2 : 0 }}>
					{isHost ? (
						<>
							<StyledButton
								variant='contained'
								color={activity.isCancelled ? 'success' : 'error'}
								onClick={() => updateAttendance.mutate(activity.id)}
								disabled={ updateAttendance.isPending }
							>
								{activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
							</StyledButton>
							<StyledButton
								variant="contained"
								color="primary"
								component={Link}
								to={`/manage/${activity.id}`}
								disabled={activity.isCancelled}
							>
								Manage Event
							</StyledButton>
						</>
					) : (
						<StyledButton
							variant="contained"
							color={isGoing ? 'primary' : 'info'}
							onClick={() => updateAttendance.mutate()}
							disabled={updateAttendance.isPending || activity.isCancelled}
							sx={{fontSize: 'auto'}}
						>
							{isGoing ? 'Cancel Attendance' : 'Join Activity'}
						</StyledButton>
					)}
				</Box>
			</Box>
		</Card>
	)
}
