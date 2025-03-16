import { Box, Grow } from "@mui/material"
import ActivityCard from "./ActivityCard"
import { useEffect, useState } from "react"

type Props = {
  activities: Activity[]
  HandleSelectActivity: (index: number) => void
  HandleFormDelete: (id: string) => void
}

export default function ActivityList({ activities, HandleSelectActivity, HandleFormDelete }: Props) {
  const [expandIndies, setExpandIndies] = useState<number[]>([]);

  useEffect(() => {
    activities.forEach((_, index) => {
      if (expandIndies.includes(index))
        return;
      setTimeout(() => {
        setExpandIndies((pre) => [...pre, index])
      }, index * 100);
    })
  }, [activities])



  return (
    <Box sx={{ display: 'flex', flexDirection: "column", gap: 3 }}>
      {activities.map((activity, index) => (
        <Grow
          key={index}
          timeout={1000}
          in={expandIndies.includes(index)}
          unmountOnExit
        >
          <ActivityCard activity={activity} key={activity.id} index={index} HandleSelectActivity={HandleSelectActivity} HandleFormDelete={HandleFormDelete}/>
        </Grow>
      ))}
    </Box>
  )
}