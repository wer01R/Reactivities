import { AppBar, styled } from "@mui/material";

export
    const GradientAppBar = styled(AppBar)({
        backgroundSize: '3000% 100%',
        backgroundImage: 'linear-gradient(90deg, #205781, #4F959D, #98D2C0, #98D2C0, #4F959D, #205781, #4F959D)',
        animation: 'gradient 10s linear infinite',
        '@keyframes gradient': {
            '0%': {
                backgroundPosition: "0% 0%"
            },

            '100%': {
                backgroundPosition: "87% 100%"
            }
        }
    })