import { Box, CircularProgress, Grow, Typography } from "@mui/material"
import ActivityCard from "./ActivityCard"
import { useEffect, useState } from "react"
import { useActivities } from "../../../lib/hooks/useActivitise";
import { useInView } from 'react-intersection-observer';
import { observer } from "mobx-react-lite";

const ActivityList = observer(function () {
  const [expandIndies, setExpandIndies] = useState<number[]>([]);
  const { activitiesGroup, isLoading, hasNextPage, fetchNextPage } = useActivities();
  const {ref, inView} = useInView({
    threshold: 0.5
  });
  useEffect(() => {
    if(hasNextPage && inView) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]) 


  useEffect(() => {
    if (!activitiesGroup || isLoading) return;

    activitiesGroup.pages.forEach((page, index1) => {
      page.items.forEach((_, index2) => {
        const index = index1 * page.items.length + index2;
        if (expandIndies.includes(index))
          return;
        setTimeout(() => {
          setExpandIndies((pre) => [...pre, index])
        }, index * 100);
      })
    })
  }, [activitiesGroup, isLoading])

  if (isLoading) return <CircularProgress />;
  if (!activitiesGroup) return <Typography>Activities not found</Typography>

  return (
    <Box sx={{ display: 'flex', flexDirection: "column", gap: 3 }}>
      {activitiesGroup.pages.map((page, index1) => (
        <Box 
          key={index1}
          ref={index1 == activitiesGroup.pages.length - 1 ? ref : null}
          display='flex'
          flexDirection='column'
          gap={3}
        >
          {page.items.map((activity, index2) => {
            const index = index1 * page.items.length + index2;
            return (
              <Grow
                key={index}
                timeout={1000}
                in={expandIndies.includes(index)}
                unmountOnExit
              >
                <ActivityCard activity={activity} key={activity.id} />
              </Grow>
            )
          })}
        </Box>
      ))}
    </Box>
  )
});

export default ActivityList;