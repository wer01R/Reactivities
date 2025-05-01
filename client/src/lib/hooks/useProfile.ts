import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";
import { ProfileType } from "../schemas/profileSchema";

export const useProfile = (id?: string, predicate?: string, filter?: string) => {
  const queryClient = useQueryClient();

  const {data: profile, isLoading: isLoadingProfile} = useQuery<Profile>({
    queryKey: ['profile', id],
    queryFn: async () => {
      const response = await agent.get<Profile>(`/profiles/${id}`);
      return response.data;
    },
    enabled: !!id && !predicate && !filter
  });

  const {data: photos, isLoading: isLoadingPhotos} = useQuery<Photo[]>({
    queryKey: ['photos', id],
    queryFn: async () => {
      const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
      return response.data;
    },
    enabled: !!id && !predicate && !filter
  });

  const {data: userActivities, 
    isPending: isLoadingUserActivities} = useQuery<UserActivity[]>({

    queryKey: ['userActivities', id, filter],
    queryFn: async () => {
      const response = await agent.get<UserActivity[]>(`/profiles/${id}/activities`, {
        params: {
          filter
        }
      });
      return response.data;
    },
    enabled: !!id && !predicate && !!filter
  })

  const {data: followings, isLoading: isLoadingFollowings} = useQuery({
    queryKey: ['profile', id, predicate],
    queryFn: async () => {
      const response = 
        await agent.get<Profile[]>(`/profiles/${id}/follow-list?predicate=${predicate}`);
      return response.data;
    },
    enabled: !!id && !!predicate && !filter
  })

  const uploadPhoto = useMutation({
    mutationFn: async (file: Blob) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await agent.post("/profiles/add-photo", formData, {
        headers: {'Content-Type': "multipart/form-data"}
      });
      return response.data;
    },
    onSuccess: async (photo: Photo) => {
      await queryClient.invalidateQueries({
        queryKey: ['photos', id]
      });
      queryClient.setQueryData(['user'], (data: User) => {
        if(!data) return data;
        return {
          ...data,
          imageUrl: data.imageUrl ?? photo.url
        }
      });
      queryClient.setQueryData(['profile', id], (data: Profile) => {
        if(!data) return data;
        return {
          ...data,
          imageUrl: data.imageUrl ?? photo.url
        }
      });
    }
  })

  const deletePhoto = useMutation({
    mutationFn: async (photoId: string) => {
      await agent.delete(`profiles/${photoId}/photos`);
    },
    onSuccess: (_, photoId) => {
      queryClient.setQueryData(['photos', id], (photos: Photo[]) => {
        return photos.filter(x => x.id !== photoId);
      })
    }
  })

  const setMainPhoto = useMutation({
    mutationFn: async (photo: Photo) => {
      await agent.put(`/profiles/${photo.id}/setMain`);
    },
    onSuccess: (_, photo) => {
      queryClient.setQueryData(['user'], (data: User) => {
        if(!data) return data;
        return {
          ...data,
          imageUrl: photo.url
        }
      });
      queryClient.setQueryData(['profile', id], (data: Profile) => {
        if(!data) return data;
        return {
          ...data,
          imageUrl: photo.url
        }
      });
    }
  })

  const updateProfile = useMutation({
    mutationFn: async (profile: ProfileType) => {
      await agent.put("/profiles", profile);
    },
    onSuccess: (_, profile) => {
      queryClient.setQueryData(['user'], (user: User) => {
        if(!user) return user;
        return {
          ...user,
          displayName: profile.displayName,
          bio: profile.bio
        }
      });
      queryClient.setQueryData(['profile', id], (data: Profile) => {
        if(!data) return data;
        return {
          ...data,
          displayName: profile.displayName,
          bio: profile.bio
        }
      });
    }
  })

  const updateFollowing = useMutation({
    mutationFn: async () => {
      await agent.post(`/profiles/${id}/follow`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['profile', id, 'followers']});
      queryClient.setQueryData(['profile', id], (profile: Profile) => {
        if(!profile || profile.followersCount == undefined) return profile;
        return {
          ...profile,
          following: !profile.following,
          followersCount: profile.following 
            ? profile.followersCount - 1 
            : profile.followersCount + 1 
        }
      })
    }
  })

  const isCurrentUser = useMemo(() => {
    return id === queryClient.getQueryData<Profile>(['user'])?.id;
  }, [id, queryClient])

  return {
    profile,
    isLoadingProfile,
    photos,
    isLoadingPhotos,
    isCurrentUser,
    uploadPhoto,
    setMainPhoto,
    deletePhoto,
    updateProfile,
    updateFollowing,
    followings,
    isLoadingFollowings,
    userActivities,
    isLoadingUserActivities
  }
}