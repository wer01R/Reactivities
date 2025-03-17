import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = () => {
  const queryClient = useQueryClient();
  
	const { data: activities, isPending } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const respose = await agent.get<Activity[]>("/activities");
      return respose.data;
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
      await agent.post<Activity>("/activities", activity);
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

	return {activities, isPending, updateActivity, createActivity, deleteActivity}
}