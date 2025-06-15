import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount"
import { LoginSchame, LoginType } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { NavLink, useLocation, useNavigate } from "react-router";

export default function LoginForm() {
	const { loginUser } = useAccount();
	const navigate = useNavigate();
	const location = useLocation();
	const { control, handleSubmit, formState: {isSubmitting} } = useForm<LoginType>({
		mode: "onChange",
		resolver: zodResolver(LoginSchame)
	});

	const onSubmit = async (data : LoginType) => {
		await loginUser.mutateAsync(data, {
			onSuccess: () => {
				navigate(location.state?.from || '/activities');
			}
		});
	}

	return (
		<Paper
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				p: 3,
				gap: 3,
				maxWidth: 'md',
				borderRadius: 3,
				mx: 'auto',
				mt: '2rem'
			}}
		>
			<Box display='flex' alignItems='center' justifyContent='center' 
				gap={3} color='secondary.main' >
				<LockOpen fontSize="large" />
				<Typography variant="h4">Sign in</Typography>
			</Box>
			<TextInput label='Email' control={control} name="email" />
			<TextInput label='Password' type="password" control={control} name="password" />
			<Button
				type="submit"
				disabled={isSubmitting}
				size="large"
				variant="contained"
			>
				login
			</Button>

			<Typography sx={{textAlign: 'center'}}>
				Don't have an account? 
				<Typography sx={{ml: 2}} component={NavLink} to='/register' color='primary' >
					Sign up
				</Typography>
			</Typography>
		</Paper>
	)
}