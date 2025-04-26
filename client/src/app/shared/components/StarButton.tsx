import { Star, StarBorder } from "@mui/icons-material"
import { Box, Button } from "@mui/material"

type Props = {
	selected: boolean
}

export default function StarButton({selected}: Props) {
	return (
		<Box position='relative'>	
			<Button 
				sx={{
					transition: 'opacity 0.3s',
					position: 'relative',
					cursor: 'pointer'
				}}
			>	
				<StarBorder 
					sx={{
						fontSize: 36,
						position: 'absolute',
						color: 'white'
					}}
				/>
				<Star
					sx={{
						fontSize: 25,
						position: 'relative',
						color: selected ? 'yellow' : 'rgba(0, 0, 0, 0.5)'
					}}
				/>
			</Button>
		</Box>
	)
}