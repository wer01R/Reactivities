import { Box, CircularProgress, Grow, Typography } from "@mui/material"
import ActivityCard from "./ActivityCard"
import { useEffect, useState } from "react"
import { useActivities } from "../../../lib/hooks/useActivitise";


export default function ActivityList() {
  const [expandIndies, setExpandIndies] = useState<number[]>([]);
  
  const {activities, isLoading} = useActivities();

  
  useEffect(() => {
    if(!activities || isLoading) return;

    activities.forEach((_, index) => {
      if (expandIndies.includes(index))
        return;
      setTimeout(() => {
        setExpandIndies((pre) => [...pre, index])
      }, index * 100);
    })
  }, [activities, isLoading])

	if(isLoading) return <CircularProgress />;
  if(!activities) return <Typography>Activities not found</Typography>

  return (
    <Box sx={{ display: 'flex', flexDirection: "column", gap: 3 }}>
      {activities.map((activity, index) => (
        <Grow
          key={index}
          timeout={1000}
          in={expandIndies.includes(index)}
          unmountOnExit
        >
          <ActivityCard activity={activity} key={activity.id} />
        </Grow>
      ))}
    </Box>
  )
}