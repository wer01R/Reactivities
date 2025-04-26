import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import Cropper, { ReactCropperElement } from "react-cropper";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone';
import "cropperjs/dist/cropper.css";

type Props = {
	uploadPhoto: (file: Blob) => void
	isLoading: boolean
}

export default function PhotoUploadWidget({uploadPhoto, isLoading} : Props) {
	const [files, setFiles] = useState<(File & { preview: string; })[]>([]);
	const cropperRef = useRef<ReactCropperElement>(null);

	useEffect(() => {
		return () => {
			files.forEach(file => {
				URL.revokeObjectURL(file.preview)
			})
		}
	}, [files])

	const onDrop = useCallback((acceptedFiles : File[]) => {
		setFiles(acceptedFiles.map(file => Object.assign(file, {
			preview: URL.createObjectURL(file)
		})))
	}, []);
	const onCrop = useCallback(() => {
		const crop = cropperRef.current?.cropper;
		crop?.getCroppedCanvas().toBlob((data) => {
			if(data) uploadPhoto(data)
		})
	}, [uploadPhoto]);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	return (
		<Grid2 container spacing={3} width="100%">
			<Grid2 size={4}>
				<Typography variant="overline" color="secondary">Step 1 - Add photo</Typography>
				<Box {...getRootProps()}
					sx={{
						border: "dashed 3px #eee",
						borderColor: isDragActive ? "green" : "#eee",
						borderRadius: "5px",
						pt: "30px",
						textAlign: "center",
						height: '280px'
					}}
				>
					<input {...getInputProps()} />
					<CloudUpload sx={{fontSize: 80}} />
					<Typography variant="h5">Drag image here or click to upload</Typography>
				</Box>
			</Grid2>

			<Grid2 size={4}>
				<Typography variant="overline" color="secondary">Step 2 - Resize image</Typography>
				{files[0]?.preview && 
				<Cropper 
					src={files[0].preview}
					style={{height: 300, width: "90%"}}
					aspectRatio={1}
					initialAspectRatio={1}
					preview=".img-preview"
					guides={false}
					background={true}
					viewMode={1}
					dragMode="move"
					ref={cropperRef}
				/>}
			</Grid2>

			<Grid2 size={4}>
				{files[0]?.preview && 
				<>
					<Typography variant="overline" color="secondary">Step 3 - Preview & upload</Typography>
					<div 
						className="img-preview"
						style={{height: 300, width: 300, overflow: 'hidden'}}
					/>
					<Button
						sx={{mt: 2}}
						onClick={onCrop}
						variant="contained"
						color="secondary"
						disabled={isLoading}
					>
						Upload
					</Button>
				</>}
			</Grid2>
		</Grid2>
	)
}