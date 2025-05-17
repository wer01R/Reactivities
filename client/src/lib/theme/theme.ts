import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme();

const theme = createTheme({
  ...baseTheme,
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      [baseTheme.breakpoints.up('sm')]: {
        fontSize: '4rem',
      },
      [baseTheme.breakpoints.up('md')]: {
        fontSize: '6rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      [baseTheme.breakpoints.up('sm')]: {
        fontSize: '2.25rem',
      },
      [baseTheme.breakpoints.up('md')]: {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
      [baseTheme.breakpoints.up('sm')]: {
        fontSize: '2rem',
      },
      [baseTheme.breakpoints.up('md')]: {
        fontSize: '2.25rem',
      },
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      [baseTheme.breakpoints.up('sm')]: {
        fontSize: '1.75rem',
      },
      [baseTheme.breakpoints.up('md')]: {
        fontSize: '2rem',
      },
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      [baseTheme.breakpoints.up('sm')]: {
        fontSize: '1.5rem',
      },
      [baseTheme.breakpoints.up('md')]: {
        fontSize: '1.75rem',
      },
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
      [baseTheme.breakpoints.up('sm')]: {
        fontSize: '1.25rem',
      },
      [baseTheme.breakpoints.up('md')]: {
        fontSize: '1.5rem',
      },
    },
  },
});

export default theme;
