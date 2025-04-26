import { CircularProgress, Grid2 } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { Navigate, useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";

export default function ProfilePage() {
	const {id} = useParams();
	const {profile, isLoadingProfile} = useProfile(id);

	if(isLoadingProfile) return <CircularProgress />
	if(!profile) return <Navigate to='/not-found' />

	return (
		<Grid2 container>
			<Grid2 size={12}>
				<ProfileHeader profile={profile}/>
				<ProfileContent/>
			</Grid2>
		</Grid2>
	)
}