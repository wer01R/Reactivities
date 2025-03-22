import { Box, Button, Paper, TextField, Typography, SelectChangeEvent, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import BaseActivity from "../../../lib/types/baseObjectByType/BaseActivity";
import ActivityCategorySelect from "./ActivityCategorySelect";
import { useActivities } from "../../../lib/hooks/useActivitise";
import { useNavigate, useParams } from "react-router";

type Props = {
  style?: React.CSSProperties
  className?: string
}

const ActivityForm = React.forwardRef<HTMLDivElement, Props>(({ style, className}: Props, ref) => {
  const { id } = useParams();
  const {activity ,updateActivity, createActivity, isLoadingActivity} = useActivities(id);
  const [value, setValue] = useState<Activity>(activity ?? BaseActivity);
  const navigate = useNavigate();


  function HandleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) {
    const a: Activity = {
      ...value,
      [e.target.name]: e.target.value
    }
    setValue(a);
  }

  async function HandleSubmit() {
    if(activity) {
      await updateActivity.mutateAsync(value);
      navigate(`/activities/${id}`);
    }
    else { 
      createActivity.mutate(value, {
        onSuccess: (id) => {
          navigate(`/activities/${id}`);
        }
      });
    }
  }

  if(isLoadingActivity) return <CircularProgress />

  return (
    <div ref={ref} style={style} className={className} id="divActivityForm">
      <Paper component="form" onSubmit={(e) => { e.preventDefault(); HandleSubmit() }} sx={{ bordedrRaius: 3, padding: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          {activity ? 'Edit activity' : 'Create activity'}
        </Typography>

        <Box display="flex" flexDirection="column" gap={3} >
          <TextField required value={value.title} onChange={e => HandleChange(e)} name="title" label="Title" />
          <TextField required value={value.description} onChange={e => HandleChange(e)} name="description" label="Description" multiline maxRows={5} />

          <ActivityCategorySelect value={value} HandleChange={HandleChange} />

          <TextField required value={(value.date ? 
            new Date(value.date) : new Date()).toISOString().split('T')[0]
          } onChange={e => HandleChange(e)} name="date" label="Date" type="date" />

          <TextField required value={value.city} onChange={e => HandleChange(e)} name="city" label="City" />
          <TextField required value={value.venue} onChange={e => HandleChange(e)} name="venue" label="Venue" />
        </Box>

        <Box display="flex" justifyContent={"end"} gap={3} mt={1}>
          <Button onClick={() => navigate("/activities")}>Cancel</Button>
          <Button 
            type="submit" 
            color="success" 
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >Submit</Button>
        </Box>
      </Paper>
    </div>
  )
})

export default ActivityForm;