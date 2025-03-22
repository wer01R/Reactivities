import { Box, Container, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import { Outlet } from 'react-router';

function App() {
  return (
    <Box sx={{ backgroundColor: '#eeeeee', display: 'flex', minHeight: '100vh', paddingBottom: 3 }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: '4.5rem', pd: 4 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default App
