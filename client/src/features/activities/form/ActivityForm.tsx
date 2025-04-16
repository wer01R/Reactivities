import { Box, Button, Paper, Typography, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useActivities } from "../../../lib/hooks/useActivitise";
import { useNavigate, useParams } from "react-router";
import { useForm } from 'react-hook-form'
import { activitySchema, ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

type Props = {
  style?: React.CSSProperties
  className?: string
}

const ActivityForm = React.forwardRef<HTMLDivElement, Props>(({ style, className }: Props, ref) => {
  const { id } = useParams();
  const { activity, updateActivity, createActivity, isLoadingActivity } = useActivities(id);
  const navigate = useNavigate();
  const { control, reset, handleSubmit } = useForm<ActivitySchema>({
    mode: "onBlur",
    resolver: zodResolver(activitySchema)
  });

  useEffect(() => {
    if (activity) reset({
      ...activity,
      location: {
        venue: activity.venue,
        city: activity.city,
        longitude: activity.longitude,
        latitude: activity.latitude
      }
    });
  }, [activity, reset]);

  async function onSubmit(data: ActivitySchema) {
    const {location, ...reset} = data;
    const flattenedData = {...reset, ...location};
    try {
      if(activity)
        updateActivity.mutate({...activity, ...flattenedData}, {
          onSuccess: () => navigate(`/activities/${activity.id}`)
        })
      else 
        createActivity.mutate(flattenedData as unknown as Activity, {
          onSuccess: (id) => navigate(`/activities/${id}`)
        })
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoadingActivity) return <CircularProgress />

  return (
    <div ref={ref} style={style} className={className} id="divActivityForm">
      <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ bordedrRaius: 3, padding: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          {activity ? 'Edit activity' : 'Create activity'}
        </Typography>

        <Box display="flex" flexDirection="column" gap={3} >
          <TextInput label='Title' control={control} name='title' />
          <TextInput label='Description' control={control} name='description' multiline maxRows={10} />

          <Box sx={{ display: 'flex', gap: 3 }}>
            <SelectInput label='Category' control={control} name='category' items={categoryOptions} />
            <DateTimeInput label='Date' control={control} name='date' />
          </Box>

          <LocationInput label='Enter the location' control={control} name='location' />
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