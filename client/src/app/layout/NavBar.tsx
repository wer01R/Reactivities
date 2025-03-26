import { Group } from "@mui/icons-material";
import { Box, Button, Container, LinearProgress, MenuItem, Toolbar, Typography } from "@mui/material";
import {GradientAppBar} from "./GradientAppBar";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { Observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";


export default function NavBar() {
  const {uiStore} = useStore();

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
              <MenuItemLink to='/counter'>
                Counter
              </MenuItemLink>
            </Box>

            <MenuItem>
              User Info
            </MenuItem>
          </Toolbar>
        </Container>

        <Observer>
          {() => ( uiStore.isLoading ? 
            <LinearProgress 
              color="secondary"
              sx={{
                position: 'relative',
                left: 0,
                right: 0,
                buttom: 0,
                height: 4
              }}  
            /> : null
          )}  
        </Observer>
      </GradientAppBar>
    </Box>
  )
}

