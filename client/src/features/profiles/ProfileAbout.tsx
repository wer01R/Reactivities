import { Box, Button, Divider, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { useState } from "react";
import ProfileUploadForm from "./ProfileUploadForm";
import { ProfileType } from "../../lib/schemas/profileSchema";
import { toast } from "react-toastify";

export default function ProfileAbout() {
	const { id } = useParams();
	const { profile, updateProfile, isCurrentUser } = useProfile(id);
	const [ editMode, setEditMode ] = useState(false);

	const handleProfileUpdate = (newProfile: ProfileType) => {
		if(newProfile.bio === profile?.bio  
			&& newProfile.displayName === profile.displayName) {
				setEditMode(false);
				return;
		}
		
		updateProfile.mutate(newProfile, {
			onSuccess: () => {
				setEditMode(false);
				toast.success("update success");
			}
		})
	}

	return (
		<Box>
			<Box display='flex' justifyContent='space-between'>
				<Typography variant='h5'>About {profile?.displayName}</Typography>
				{isCurrentUser && <Button onClick={() => setEditMode(!editMode)}>
					{editMode ? "cancel" : "Edit Profile"}
				</Button>}
			</Box>
			<Divider sx={{ my: 2 }} />
			{editMode ? (
				<ProfileUploadForm handleProfileUpdate={handleProfileUpdate} profile={profile} isLoading={updateProfile.isPending} />
			): (
				<Box sx = {{ overflow: 'auto', maxHeight: 350 }} >
					<Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
						{profile?.bio || "No desription added yet"}
					</Typography>
				</Box>
			)}
		</Box >
	)
}