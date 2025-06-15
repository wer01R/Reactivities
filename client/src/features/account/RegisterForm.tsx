import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount"
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { NavLink } from "react-router";
import { RegisterSchame, RegisterType } from "../../lib/schemas/registerSchema";

export default function RegisterForm() {
	const { registerUser } = useAccount();
	const { control, setError, handleSubmit, formState: {isSubmitting} } = useForm<RegisterType>({
		mode: "onChange",
		resolver: zodResolver(RegisterSchame)
	});

	const onSubmit = async (data : RegisterType) => {
		await registerUser.mutateAsync(data, {
			onError: (error) => {
				if(Array.isArray(error)) {
					error.forEach((err : string) => {
						if(err.includes("Email")) setError('email', {message: err});
						else if(err.includes("Password")) setError('password', {message: err});
					})
				}
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
				<Typography variant="h4">Register</Typography>
			</Box>
			<TextInput label='Email' control={control} name="email" />
			<TextInput label='Display name' control={control} name="displayName" />
			<TextInput label='Password' type="password" control={control} name="password" />
			<Button
				type="submit"
				disabled={isSubmitting}
				size="large"
				variant="contained"
			>
				register
			</Button>

			<Typography sx={{textAlign: 'center'}}>
				Already have an account? 
				<Typography sx={{ml: 2}} component={NavLink} to='/login' color='primary' >
					Sign in
				</Typography>
			</Typography>
		</Paper>
	)
}