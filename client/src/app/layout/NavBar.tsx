import { Group } from "@mui/icons-material";
import { Box, Button, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import {GradientAppBar} from "./GradientAppBar";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";


export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <GradientAppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <Button component={NavLink} to="/" sx={{display: 'flex', gap: 2, color: "white"}}>
                <Group fontSize="large" />
                <Typography variant='h4' fontWeight='bold'>
                    Reactivities
                </Typography>
              </Button>
            </Box>
            <Box sx={{display: 'flex'}}>
              <MenuItemLink to='/activities'>
                activities
              </MenuItemLink>
              <MenuItemLink to='/createActivity'>
                Create Activity
              </MenuItemLink>
            </Box>

            <MenuItem>
              User Info
            </MenuItem>
          </Toolbar>
        </Container>
      </GradientAppBar>
    </Box>
  )
}

