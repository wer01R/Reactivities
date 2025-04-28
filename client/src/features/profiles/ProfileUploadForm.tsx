import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { ProfileSchema, ProfileType } from "../../lib/schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import TextInput from "../../app/shared/components/TextInput";

type Props = {
	profile: Profile | undefined
	handleProfileUpdate: (profile: ProfileType) => void
	isLoading: boolean
}

export default function ProfileUploadForm({profile, handleProfileUpdate, isLoading} : Props) {
	const {control, handleSubmit, formState, reset} = useForm<ProfileType>({
		mode: 'onBlur',
		resolver: zodResolver(ProfileSchema)
	})

	useEffect(() => {
		if(profile) reset(profile);
	}, [profile, reset])

	return (
		<Box 
			component="form" 
			display='flex' 
			flexDirection='column' 
			gap={3}
			onSubmit={handleSubmit(handleProfileUpdate)}
		>
			<TextInput control={control} name="displayName" label="Display Name" />
			<TextInput control={control} name="bio" label="Add your bio" multiline maxRows={5} minRows={3}/>
			<Button 
				type="submit" 
				fullWidth 
				variant="contained" 
				disabled={formState.isSubmitting || isLoading}
			>
				update profile
			</Button>
		</Box>
	)
}