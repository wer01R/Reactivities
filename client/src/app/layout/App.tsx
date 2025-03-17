import { Box, CircularProgress, Container, CssBaseline } from '@mui/material';
import { useState } from 'react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useActivities } from '../../lib/hooks/useActivitise';

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [formOpen, setFormOpen] = useState(false);
  const {activities, isPending} = useActivities();

  function HandleFormOpen(index?: number) {
    if (!index)
      HandleCancelActivity();

    if (formOpen) {
      HandleFormClose(undefined);
      setTimeout(() => {
        setFormOpen(true);
      }, 500)
    }
    else
      setFormOpen(true);
  }

  function HandleFormClose(activity: Activity | undefined) {
    setFormOpen(false);
    setSelectedActivity(activity);
  }

  function HandleSelectActivity(index: number) {
    if(!activities) return;

    if(index >= activities.length)
        return;
    HandleFormClose(undefined);
    setSelectedActivity(activities[index]);
  }

  function HandleCancelActivity() {
    setSelectedActivity(undefined);
  }

  return (
    <Box sx={{ backgroundColor: '#eeeeee', display: 'flex', minHeight: '100vh', paddingBottom: 3 }}>
      <CssBaseline />
      <NavBar HandleFormOpen={HandleFormOpen} />
      <Container maxWidth="xl" sx={{ mt: '4.5rem', pd: 4 }}>
        {!activities || isPending ? (
          <CircularProgress />)
          : (
            <ActivityDashboard
              activities={activities}
              selectedActivity={selectedActivity}
              HandleSelectActivity={HandleSelectActivity}
              HandleCancelActivity={HandleCancelActivity}
              HandleFormClose={HandleFormClose}
              formOpen={formOpen}
              HandleFormOpen={HandleFormOpen}
            />
          )
        }
      </Container>
    </Box>
  )
}

export default App
