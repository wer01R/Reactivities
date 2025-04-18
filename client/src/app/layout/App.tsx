import { Box, Container, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import { Outlet, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';

function App() {
  const location = useLocation();
  return (
    <Box sx={{ backgroundColor: '#eeeeee', display: 'flex', minHeight: '100vh', paddingBottom: 3 }}>
      <CssBaseline />
      {location.pathname == '/' ? <HomePage /> :
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ mt: '4.5rem', pd: 4 }}>
            <Outlet />
          </Container>
        </>
      }
    </Box>
  )
}

export default App
