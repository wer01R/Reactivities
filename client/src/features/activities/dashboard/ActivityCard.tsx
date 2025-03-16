import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import React from "react"

type Props = {
  activity: Activity
  HandleSelectActivity: (index: number) => void
  HandleFormDelete: (id: string) => void
  index: number
  style?: React.CSSProperties
  className?: string
}

const ActivityCard = React.forwardRef<HTMLDivElement, Props>(({activity, index, HandleSelectActivity, style, className, HandleFormDelete}, ref) => {
  return (
    <div ref={ref} style={style} className={className}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5">{activity.title}</Typography>
          <Typography sx={{ color: "text.secondary", mb: 1 }}>{activity.date}</Typography>
          <Typography variant='body2'>{activity.description}</Typography>
          <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Chip label={activity.category} variant='outlined' />
          <Box display="flex" gap={2}>
            <Button size="medium" variant="contained" onClick={() => HandleSelectActivity(index)}>View</Button>
            <Button size="medium" variant="contained" color="error" onClick={() => HandleFormDelete(activity.id)}>Delete</Button>
          </Box>
        </CardActions>
      </Card>
    </div>
  )
})

export default ActivityCard;