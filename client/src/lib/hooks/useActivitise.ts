import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { currentUser } = useAccount();
  
	const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
    enabled: !id && location.pathname === '/activities' && !!currentUser,
    select: data => data.map(activity => {
      const host = activity.attendees.find(x => x.id === activity.hostId);
      return {
        ...activity,
        isHost: currentUser?.id === activity.hostId,
        isGoing: activity.attendees.some(attendee => attendee.id === currentUser?.id),
        hostImageUrl: host?.imageUrl
      }
    })
  })

  const {data: activity, isLoading: isLoadingActivity} = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: data => {
      const host = data.attendees.find(x => x.id === data.hostId);
      return {
        ...data,
        isHost: currentUser?.id === data.hostId,
        isGoing: data.attendees.some(attendee => attendee.id === currentUser?.id),
        hostImageUrl: host?.imageUrl
      }
    }
  })

  const updateActivity = useMutation({
    mutationFn: async (activity : Activity) => {
      await agent.put<Activity>("/activities", activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      });
    }
  })

  const createActivity = useMutation({
    mutationFn: async (activity : Activity) => {
      const response = await agent.post<string>("/activities", activity);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      });
    }
  })

  const deleteActivity = useMutation({
    mutationFn: async (id : string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      });
    }
  })

  const updateAttendance = useMutation({
    mutationFn: async () => {
      await agent.post(`/activities/${id}/attend`);
    },
    onMutate: async () => {
      const qKey = ["activities", id];
      await queryClient.cancelQueries({queryKey: qKey});

      const preActivity = queryClient.getQueryData<Activity>(qKey);

      queryClient.setQueryData<Activity>(qKey, oldActivity => {
        if(!oldActivity || !currentUser) {
          return oldActivity;
        }

        const isHost = oldActivity.hostId === currentUser.id;
        const isAttending = oldActivity.attendees.some(x => x.id === currentUser.id);

        return {
          ...oldActivity,
          isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
          attendees: isHost
            ? oldActivity.attendees
            : isAttending
              ? oldActivity.attendees.filter(x => x.id != currentUser.id)
              : [...oldActivity.attendees, {
                id: currentUser.id,
                displayName: currentUser.displayName,
                imageUrl: currentUser.imageUrl                
              }]
        }
      });

      return {preActivity};
    },
    onError: (error, _, context) => {
      console.log(error);
      if(context?.preActivity) {
        queryClient.setQueryData<Activity>(['activities', id], context.preActivity);
      }
    }
  })

	return {
    activities, 
    activity, 
    isLoadingActivity, 
    isLoading, 
    updateActivity, 
    createActivity, 
    deleteActivity,
    updateAttendance,
  }
}