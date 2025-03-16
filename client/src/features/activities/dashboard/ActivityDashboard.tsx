import { Grid2, Grow } from "@mui/material"
import ActivityList from "./ActivityList"
import ActivityDetail from "../details/ActivityDetail"
import ActivityForm from "../form/ActivityForm"

type Props = {
	activities: Activity[]
	selectedActivity?: Activity
	HandleSelectActivity: (index : number) => void
	HandleCancelActivity: () => void
	HandleFormClose: () => void
	HandleFormOpen: (index?: number) => void
	HandleFormSubmit: (newActvity : Activity) => void
	HandleFormDelete: (id: string) => void
	formOpen: boolean
}

export default function ActivityDashboard({ activities, selectedActivity, HandleFormDelete, HandleCancelActivity, HandleSelectActivity, HandleFormClose, HandleFormOpen, HandleFormSubmit, formOpen }: Props) {
	return (
		<Grid2 container spacing={3}>
			<Grid2 size={7}>
					<ActivityList activities={activities} HandleSelectActivity={HandleSelectActivity} HandleFormDelete={HandleFormDelete}/>
			</Grid2>

			<Grid2 size={5}>
				{selectedActivity && !formOpen && <ActivityDetail activity={selectedActivity} HandleCancelActivity={HandleCancelActivity} HandleFormOpen={HandleFormOpen}/>}

				<Grow 
					in={formOpen}
					style={{transformOrigin: "100% 0 0"}}
					unmountOnExit
				> 
					<ActivityForm HandleFormClose={HandleFormClose} HandleFormSubmit={HandleFormSubmit} activity={selectedActivity}/>
				</Grow>
			</Grid2>
		</Grid2>
	)
}