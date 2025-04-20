import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { LoginType } from "../schemas/loginSchema";
import agent from "../api/agent";
import { useLocation, useNavigate } from "react-router";
import { RegisterType } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  const loginUser = useMutation({
    mutationFn: async (creds: LoginType) => {
      await agent.post("/login?useCookies=true", creds);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user']
      });
    }
  })

  const registerUser = useMutation({
    mutationFn: async (creds : RegisterType) => {
      await agent.post("/account/register", creds);
    },
    onSuccess: () => {
      toast.success("Register successful - you can now login");
    }
  })

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post('/account/logout');
    },
    onSuccess: () => {
      queryClient.removeQueries({queryKey: ['user']});
      queryClient.removeQueries({queryKey: ['activities']});
      navigate('/');
    }
  })

  const {data: currentUser, isLoading: isLoadingUserInfo} = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      console.log(queryClient.getQueryData(['user']));
      const response = await agent.get<User>('/account/user-info');
      return response.data
    },
    enabled: !queryClient.getQueryData(['user'])
            && location.pathname !== '/login' 
            && location.pathname !== '/register'
  });

  return { 
    loginUser, 
    currentUser, 
    logoutUser, 
    isLoadingUserInfo, 
    registerUser 
  }
}