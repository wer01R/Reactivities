import { CircularProgress, Grid2, Typography, useMediaQuery } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivitise";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import theme from "../../../lib/theme/theme";

export default function ActivityDetailPage() {
  const { id } = useParams();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const { activity, isLoadingActivity, updateAttendance } = useActivities(id);

  if (isLoadingActivity) return <CircularProgress />
  if (!activity) return <Typography variant='h4'>Activity not found</Typography>

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ md: 8, xs: 12 }}>
        <ActivityDetailsHeader activity={activity} updateAttendance={updateAttendance} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid2>
      {isDownMd ? (
        <></>
      ) : (
        <Grid2 size={4}>
          <ActivityDetailsSidebar activity={activity} />
        </Grid2>
      )}
    </Grid2>
  )
}