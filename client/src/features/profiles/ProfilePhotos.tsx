import { useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, CircularProgress, Divider, ImageList, ImageListItem, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget";
import StarButton from "../../app/shared/components/StarButton";
import DeleteButton from "../../app/shared/components/DeleteButton";
import theme from "../../lib/theme/theme";

export default function ProfilePhotos() {
	const { id } = useParams();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const { photos, isLoadingPhotos, isCurrentUser,
		uploadPhoto, profile, setMainPhoto, deletePhoto } = useProfile(id);
	const [editMode, setEditMode] = useState(false);

	if (isLoadingPhotos) return <CircularProgress />
	if (!photos) return <Typography>No photos found for this user</Typography>

	const handlePhotoUpload = (file: Blob) => {
		uploadPhoto.mutate(file, {
			onSuccess: () => {
				setEditMode(false);
			}
		})
	}

	const setMain = (photo: Photo) => {
		if (photo.url !== profile?.imageUrl)
			setMainPhoto.mutate(photo)
	}

	return (
		<Box width="100%">

			<Box display='flex' justifyContent='space-between' >
				<Typography variant="h5">Photos</Typography>
				{isCurrentUser && (
					<Button onClick={() => { setEditMode(!editMode) }} >
						{editMode ? 'Cancel' : 'Add photo'}
					</Button>
				)}
			</Box>

			<Divider sx={{my: 2}} />

			{editMode ? (
				<PhotoUploadWidget
					uploadPhoto={handlePhotoUpload}
					isLoading={uploadPhoto.isPending}
				/>
			) : (photos.length !== 0 ? (
				<ImageList cols={isDownMd ? 2 : 6} >
					{photos.map((item) => (
						<ImageListItem key={item.id}>
							<img
								srcSet={`${item.url.replace(
									"/upload/",
									"/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/"
								)}`}
								src={`${item.url.replace(
									"/upload/",
									"/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/"
								)}`}
								alt="user profile image"
								loading="lazy"
							/>
							{isCurrentUser && (
								<div>
									<Box
										sx={{ position: 'absolute', top: 0, left: 0 }}
										onClick={() => { setMain(item) }}
									>
										<StarButton selected={item.url === profile?.imageUrl} />
									</Box>

									{profile?.imageUrl !== item.url && (
										<Box
											sx={{ position: 'absolute', top: 0, right: 0 }}
											onClick={() => { deletePhoto.mutate(item.id) }}
										>
											<DeleteButton />
										</Box>
									)}
								</div>
							)}
						</ImageListItem>
					))}
				</ImageList>
			) : <Typography>No photos added yet</Typography>
			)}
		</Box>
	)
}