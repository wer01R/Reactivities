import { Delete, DeleteOutline } from "@mui/icons-material"
import { Box, Button } from "@mui/material"

export default function DeleteButton() {
	return (
		<Box position='relative'>
			<Button
				sx={{
					cursor: 'pointer'
				}}
			>
			<DeleteOutline
				sx={{
					fontSize: 30,
					position: 'absolute',
					color: 'white'
				}}
			/>
			<Delete
				sx={{
					fontSize: 25,
					position: 'relative',
					color: 'red'
				}}
			/>
			</Button>
		</Box>
	)
}