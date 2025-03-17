import { Group } from "@mui/icons-material";
import { Box, Button, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import {GradientAppBar} from "./GradientAppBar";

type Props = {
  HandleFormOpen: () => void
}

export default function NavBar({HandleFormOpen} : Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <GradientAppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <Button sx={{display: 'flex', gap: 2, color: "white"}}>
                <Group fontSize="large" />
                <Typography variant='h4' fontWeight='bold'>
                    Reactivities
                </Typography>
              </Button>
            </Box>
            <Box sx={{display: 'flex'}}>
              <MenuItem sx={{fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'}}>
                activities
              </MenuItem>
              <MenuItem sx={{fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'}}>
                about
              </MenuItem>
              <MenuItem sx={{fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'}}>
                contact
              </MenuItem>
            </Box>

            <Button size='large' variant="contained" color='warning' onClick={() => HandleFormOpen()}>
              Create Activity
            </Button>
          </Toolbar>
        </Container>
      </GradientAppBar>
    </Box>
  )
}

