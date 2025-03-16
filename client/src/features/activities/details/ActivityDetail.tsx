import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
  activity: Activity
  HandleCancelActivity: () => void
  HandleFormOpen: (index?: number) => void
}
export default function ActivityDetail({ activity, HandleCancelActivity, HandleFormOpen}: Props) {
  return (
    <Card sx={{ borderRadius: 3, position: 'fixed'}}>
      <CardMedia
        component='img' 
        src={`public/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" color="light">{activity.date}</Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions >
        <Button color="primary" onClick={() => HandleFormOpen(1)}>Edit</Button>
        <Button color="inherit" onClick={HandleCancelActivity}>Cancel</Button>
      </CardActions>
    </Card>
  )
}