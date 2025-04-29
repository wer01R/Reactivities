import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import AvatarPopover from "../../app/shared/components/AvatarPopover";

type Props = {
	activeTab: number
}
export default function ProfileFollowings({activeTab} : Props) {
	const predicate = activeTab === 3 ? 'followers' : 'following';
	const {id} = useParams();
	const {followings, isLoadingFollowings, profile} = useProfile(id, predicate);

	return (
		<Box>
			<Box display='flex'>
				<Typography variant="h5">
					{activeTab === 3 ? `People following ${profile?.displayName}`
					: `People ${profile?.displayName} is following`}
				</Typography>
			</Box>
			<Divider sx={{my: 2}}/>
			{isLoadingFollowings ? <CircularProgress /> 
			: (!followings || followings.length == 0) ? (
				<Typography>There are no people here</Typography>
			):(
				<Box display='flex' marginTop={3} gap={3} >
					{followings?.map(profile => (
						<AvatarPopover key={profile.id} profile={profile} size={100}/>
					))}
				</Box>
			)}
		</Box>
	)
}