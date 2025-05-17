import { AccessTime, Place } from "@mui/icons-material"
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography, useMediaQuery } from "@mui/material"
import React from "react"
import { Link } from "react-router"
import { formatDate } from "../../../lib/util/util"
import AvatarPopover from "../../../app/shared/components/AvatarPopover"
import theme from "../../../lib/theme/theme"

type Props = {
  style?: React.CSSProperties
  className?: string
  activity: Activity
}

const ActivityCard = React.forwardRef<HTMLDivElement, Props>(({ activity, style, className }, ref) => {
  const isHost = activity.isHost;
  const isGoing = activity.isGoing;
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const label = isHost ? 'You are hosting' : 'You are going';
  const isCancelled = activity.isCancelled;
  const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';


  return (
    <div ref={ref} style={style} className={className}>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <CardHeader
            avatar={<Avatar
              src={activity.hostImageUrl}
              sx={{ height: 80, width: 80 }}
              alt={activity.hostDisplayName + " image"}
            />}
            title={activity.title}
            slotProps={{
              title: {
                fontWeight: 'bold',
                fontSize: 20
              }
            }}
            subheader={
              <>
                Host by{' '} <Link to={`/profiles/${activity.hostId}`}>{activity.hostDisplayName}</Link>
              </>
            }
          />

          <Box display='flex' flexDirection='column' gap={2} mr={2}>
            {(isHost || isGoing) && <Chip variant="outlined" label={label} color={color} sx={{ borderRadius: 2 }} />}
            {isCancelled && <Chip label='Cancelled' color='error' sx={{ borderRadius: 2 }} />}
          </Box>
        </Box>

        <Divider sx={{ mb: 1 }} />

        <CardContent sx={{ px: 0 }}>
          <Box 
            display='flex' 
            sx={{ flexDirection: isDownMd ? 'column' : 'row' }} 
            alignItems='flex-start' 
            mb={2} px={2} gap={1}
          >
            <Box display='flex' flexGrow={0} alignItems='center'>
              <AccessTime sx={{ mr: 1 }} />
              <Typography variant="body2" noWrap>{formatDate(activity.date)}</Typography>
            </Box>
            <Box display='flex' flexGrow={0} alignItems='center'>
              <Place sx={{ ml: isDownMd ? 0 : 3, mr: 1 }} />
              <Typography variant="body2" 
                sx={{
                  display: "-webkit-box",
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
              >{activity.venue}</Typography>
            </Box>
          </Box>

          <Divider />

          <Box display='flex' gap={2} sx={{ backgroundColor: 'grey.200', py: isDownMd ? 1 : 3, pl: 3 }} >
            {activity.attendees.map(att => (
              <AvatarPopover key={att.id} profile={att} />
            ))}
          </Box>
        </CardContent>

        <CardContent sx={{ pd: 2, pt: 0 }}>
          <Typography
            sx={{
              display: "-webkit-box",
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2
            }}
          >
            {activity.description}
          </Typography>
          <Button
            size="medium"
            variant="contained"
            component={Link}
            to={`/activities/${activity.id}`}
            sx={{ display: 'flex', justifySelf: 'end', borderRadius: 3 }}
          >View</Button>
        </CardContent>
      </Card>
    </div>
  )
})

export default ActivityCard;