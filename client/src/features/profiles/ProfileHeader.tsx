import { Avatar, Box, Button, Chip, Divider, Grid2, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import theme from "../../lib/theme/theme";

export default function ProfileHeader() {
	const { id } = useParams();
	const { profile, updateFollowing, isCurrentUser } = useProfile(id);
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

	if (!profile) return <Typography>User not found</Typography>

	return (
		<Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
			<Grid2 container spacing={2}>
				<Grid2 size={7}>
					<Stack direction={{md: "row", xs: "column"}} spacing={3} alignItems="center">
						<Avatar
							sx={{ width: 150, height: 150 }}
							src={profile.imageUrl}
							alt={profile.displayName + " image"}
						/>

						<Box display="flex" flexDirection="column" gap={2}>
							<Typography variant="h4" sx={{fontSize: isDownMd ? 40 : 25}}>
									{profile.displayName}</Typography>
							{profile.following && !isDownMd && <Chip
								variant="outlined"
								color="secondary"
								label="Following"
								sx={{ borderRadius: 1 }}
							/>}
						</Box>

					</Stack>
				</Grid2>
				<Grid2 size={5}>
					<Stack spacing={2} alignItems="center">

						<Box 
							display='flex' 
							flexDirection={isDownMd ? 'column' : 'row'} 
							justifyContent='space-around'
							width='100%' 
							gap={3}
						>
							<Box textAlign='center'>
								<Typography variant="h6">Followers</Typography>
								<Typography variant="h3">{profile.followersCount}</Typography>
							</Box>
							<Box textAlign='center'>
								<Typography variant="h6">Following</Typography>
								<Typography variant="h3">{profile.followingCount}</Typography>
							</Box>
						</Box>

						{!isCurrentUser && (
							<>
								<Divider sx={{ width: "100%" }} />
								<Button
									fullWidth
									variant="outlined"
									color={profile.following ? 'error' : 'success'}
									onClick={() => updateFollowing.mutate()}
									disabled={updateFollowing.isPending}
								>
									{profile.following ? 'Unfollow' : 'follow'}
								</Button>
							</>
						)}
					</Stack>
				</Grid2>
			</Grid2>
		</Paper>
	)
}