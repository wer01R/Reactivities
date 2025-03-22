import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivitise";

export default function ActivityDetail() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {activity, isLoadingActivity} = useActivities(id);

  if(isLoadingActivity) return <CircularProgress />
  if(!activity) return <Typography variant='h4'>Activity not found</Typography>

  return (
    <Card sx={{ borderRadius: 3}}>
      <CardMedia
        component='img' 
        src={`/public/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" color="light">{activity.date}</Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions >
        <Button color="primary" component={Link} to={`/manage/${activity.id}`}>Edit</Button>
        <Button color="inherit" onClick={() => navigate('/activities')}>Cancel</Button>
      </CardActions>
    </Card>
  )
}