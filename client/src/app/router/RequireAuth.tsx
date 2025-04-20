import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import { CircularProgress } from "@mui/material";

export default function RequireAuth() {
	const {isLoadingUserInfo, currentUser} = useAccount();
	const location = useLocation();

	if(isLoadingUserInfo) return <CircularProgress />
	if(!currentUser) return <Navigate to='/login' state={{from: location}} />

	return (
			<Outlet />
	)
}