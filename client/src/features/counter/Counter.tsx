import { Box, Button, ButtonGroup, List, ListItemText, Paper, Typography, useMediaQuery } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from "mobx-react-lite"
import theme from "../../lib/theme/theme";

const Counter = observer(() => {
	const { counterStore } = useStore();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Box display='flex' flexDirection={{md: 'row', xs: 'column'}} justifyContent='space-between'>
			<Box width='60%'>
				<Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
				<Typography variant="h6">{counterStore.count}</Typography>

				<ButtonGroup sx={{ mt: 3 }}>
					<Button onClick={() => counterStore.decrement()} variant="contained" color="error">Decrement 1</Button>
					<Button onClick={() => counterStore.increment()} variant="contained" color="success">Increment 1</Button>
					<Button onClick={() => counterStore.increment(5)} variant="contained" color="primary">Increment 5</Button>
				</ButtonGroup>
			</Box>
			<Paper sx={{ width: isDownMd ? "100%" : '40%', p: 4, mt: isDownMd ? "2rem" : "0" }}>
				<Typography variant="h5">Counter events ({counterStore.eventCount})</Typography>
				<List>
					{counterStore.events.map((e, index) => (
						<ListItemText key={index} primary={e} />
					))}
				</List>
			</ Paper>
		</Box>
	)
})

export default Counter;
