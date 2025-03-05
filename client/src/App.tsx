import { List, ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import axios from "axios";
// import './App.css'

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get("https://localhost:3001/api/activities")
    .then((response => {console.log(response); setActivities(response.data)}));

  }, [])
  return (
    <>
      <Typography variant="h3" >Reactivities</Typography>
      <List>
      {activities.map((activity) => {
        return <ListItem key={activity.id}>{activity.title}</ListItem>
      })}
      </List>
    </>
  )
}

export default App
