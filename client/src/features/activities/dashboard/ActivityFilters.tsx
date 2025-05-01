import { FilterList, Event } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import Calendar from 'react-calendar'
import 'react-calendar/src/Calendar.css'
import '../../../app/layout/style.css'
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const ActivityFilters = observer(function () {
  const {activityStore: {setFilter, setStartDate, filter, startDate}} = useStore();

	return (
		<Box sx={{display: 'flex', flexDirection: 'column', gap: 3, borderRadius: 3}}>
			<Paper sx={{p: 3, borderRadius: 3}}>
				<Box sx={{width: '100%'}}>
					<Typography variant="h6" color="primary.main" sx={{display: 'flex', alignContent: 'center', mb: 1}}>
						<FilterList sx={{mr: 1}}/>
						Filters
					</Typography>
					<MenuList>
						<MenuItem
							selected={filter === 'all'}
							onClick={() => setFilter('all')}
						>
							<ListItemText primary='All evnets'/>
						</MenuItem>
						<MenuItem
							selected={filter === 'isGoing'}
							onClick={() => setFilter('isGoing')}
						>
							<ListItemText primary="I'm going"/>
						</MenuItem>
						<MenuItem
							selected={filter === 'isHost'}
							onClick={() => setFilter('isHost')}
						>
							<ListItemText primary="I'm hosting"/>
						</MenuItem>
					</MenuList>
				</Box>
			</Paper>

			<Box component={Paper} sx={{width: '100%', p: 3, borderRadius: 3}}>
				<Typography variant="h6" color="primary" sx={{display: 'flex', alignItems: 'center', mb: 1}}>
					<Event />
					Select date
				</Typography>
				<Calendar 
					value={startDate}
				onChange={date => setStartDate(date as Date)}
				/>
			</Box>
		</Box>
	)
});

export default ActivityFilters;