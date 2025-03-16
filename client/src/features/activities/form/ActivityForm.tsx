import { Box, Button, FormControl, MenuItem, Paper, TextField, Typography, Select, InputLabel, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import BaseActivity from "../../../lib/types/baseObjectByType/BaseActivity";
type Props = {
  HandleFormClose: () => void
  HandleFormSubmit: (newActvity: Activity) => void
  style?: React.CSSProperties
  className?: string
  activity?: Activity
}

const ActivityForm = React.forwardRef<HTMLDivElement, Props>(({ HandleFormClose, HandleFormSubmit, style, className, activity }: Props, ref) => {
  const [value, setValue] = useState<Activity>(activity ?? BaseActivity);

  function HandleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) {
    const a: Activity = {
      ...value,
      [e.target.name]: e.target.value
    }
    setValue(a);
  }

  return (
    <div ref={ref} style={style} className={className} id="divActivityForm">
      <Paper component="form" onSubmit={(e) => { e.preventDefault(); HandleFormSubmit(value) }} sx={{ bordedrRaius: 3, padding: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          {activity ? 'Edit activity' : 'Create activity'}
        </Typography>

        <Box display="flex" flexDirection="column" gap={3} >
          <TextField required value={value?.title} onChange={e => HandleChange(e)} name="title" label="Title" />
          <TextField value={value?.description} onChange={e => HandleChange(e)} name="description" label="Description" multiline maxRows={5} />

          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              required
              defaultValue={'culture'}
              onChange={e => HandleChange(e)}
            >
              <MenuItem value="culture">Culture</MenuItem>
              <MenuItem value="drinks">Drinks</MenuItem>
              <MenuItem value="film">Film</MenuItem>
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="music">Music</MenuItem>
              <MenuItem value="travel">Travel</MenuItem>
            </Select>
          </FormControl>

          <TextField value={value?.date} onChange={e => HandleChange(e)} name="date" label="Date" type="date" slotProps={{ inputLabel: { shrink: true } }} />
          <TextField value={value?.city} onChange={e => HandleChange(e)} name="city" label="City" />
          <TextField value={value?.venue} onChange={e => HandleChange(e)} name="venue" label="Venue" />
        </Box>

        <Box display="flex" justifyContent={"end"} gap={3} mt={1}>
          <Button onClick={HandleFormClose}>Cancel</Button>
          <Button type="submit" color="success" variant="contained">Submit</Button>
        </Box>
      </Paper>
    </div>
  )
})

export default ActivityForm;