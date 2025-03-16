import { Box, Container, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react'
import axios from "axios";
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [formOpen, setFormOpen] = useState(false);

  function HandleFormOpen(index?: number) {
    if(!index)
      HandleCancelActivity();

    if(formOpen) {
      HandleFormClose();
      setTimeout(() => {
        setFormOpen(true);
      }, 500)
    }
    else 
      setFormOpen(true);
  }

  function HandleFormClose() {
    setFormOpen(false);
    setSelectedActivity(undefined);
  }

  function HandleSelectActivity(index : number) {
    if(index >= activities.length)
        return;
    HandleFormClose();
    setSelectedActivity(activities[index]);
  }

  function HandleCancelActivity() {
    setSelectedActivity(undefined);
  }

  function HandleFormSubmit(newActvity : Activity) {
    if(newActvity.title.length == 0) return;

    if(activities.find(x => x.id === newActvity.id)) {
      setActivities(activities.map(x => x.id === newActvity.id ? newActvity : x));
    }
    else 
      setActivities(prev => [...prev, {...newActvity, id: activities.length.toString() }])

    HandleFormClose();
  }

  function HandleFormDelete(id : string) {
    setActivities((prev) => prev.filter(x => x.id !== id));
    if(selectedActivity && id === selectedActivity.id) {
      setSelectedActivity(undefined);
    }
  }

  useEffect(() => {
    axios.get("https://localhost:3001/api/activities")
      .then((response => { setActivities(response.data) }));

  }, [])

  return (
    <Box sx = {{backgroundColor: '#eeeeee', display: 'flex', minHeight: window.innerHeight, paddingBottom: 3}}>
      <CssBaseline />
      <NavBar HandleFormOpen={HandleFormOpen}/>
      <Container maxWidth="xl" sx={{ mt: '4.5rem', pd: 4 }}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          HandleSelectActivity={HandleSelectActivity}
          HandleCancelActivity={HandleCancelActivity}
          HandleFormClose={HandleFormClose}
          formOpen={formOpen}
          HandleFormOpen={HandleFormOpen}
          HandleFormSubmit={HandleFormSubmit}
          HandleFormDelete={HandleFormDelete}
        />
      </Container>
    </Box>
  )
}

export default App
