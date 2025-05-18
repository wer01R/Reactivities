import { FilterList, Group, Menu } from "@mui/icons-material";
import { Box, Button, CircularProgress, Container, Divider, Drawer, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { GradientAppBar } from "./GradientAppBar";
import { NavLink, useLocation } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { Observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";
import theme from "../../lib/theme/theme";
import { useState } from "react";
import ActivityFilters from "../../features/activities/dashboard/ActivityFilters";


export default function NavBar() {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();
  const location = useLocation();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const [featureOpen, setFeatureOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFeatureDrawer = (isOpen: boolean) => {
    setFeatureOpen(isOpen);
  }
  const toggleFilterDrawer = (isOpen: boolean) => {
    setFilterOpen(isOpen);
  }

  const Icon = () => (
    <Box >
      <Button component={NavLink} to="/" sx={{ display: 'flex', gap: 2, color: "white" }}>
        <Group fontSize="large" />
        <Typography variant='h3' fontWeight='bold'>
          Reactivities
        </Typography>
        <Observer>
          {() => (<CircularProgress
            size={30}
            thickness={4}
            sx={{
              left: 112,
              color: 'white',
              opacity: uiStore.isLoading ? 1 : 0
            }} />)}
        </Observer>
      </Button>
    </Box>
  );
  const Feature = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isDownMd ? 'column' : 'row',
        gap: "3rem"
      }}
    >
      <MenuItemLink to='/activities'>
        activities
      </MenuItemLink>
      <MenuItemLink to='/counter'>
        Counter
      </MenuItemLink>
      <MenuItemLink to='/errors'>
        Eorrors
      </MenuItemLink>
    </Box>
  );
  const User = () => (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{ mt: isDownMd ? '1rem' : 0 }}
    >
      {currentUser ? (
        <UserMenu onClick={() => toggleFeatureDrawer(false)} />
      ) : (
        <Box onClick={() => { toggleFeatureDrawer(false) }}>
          <MenuItemLink to='/login'>Login</MenuItemLink>
          <MenuItemLink to='/register'>Register</MenuItemLink>
        </Box>
      )}
    </Box>
  );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <GradientAppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {isDownMd ? (
              <>
                <Icon />
                <Box display='flex' gap={2}>
                  {location.pathname == '/activities' ? (
                    <Button onClick={() => toggleFilterDrawer(true)}
                      sx={{ padding: 0, minWidth: "unset" }} >
                      <FilterList sx={{ color: "white" }} />
                    </Button>) : (
                    <></>
                  )}
                  <Drawer anchor="top" open={filterOpen} onClose={() => toggleFilterDrawer(false)}>
                    <Box onClick={() => { toggleFilterDrawer(false) }} >
                      <ActivityFilters />
                    </Box>
                  </Drawer>

                  <Button onClick={() => toggleFeatureDrawer(true)}
                    sx={{ padding: 0, minWidth: "unset" }}>
                    <Menu sx={{ color: "white" }} />
                  </Button>
                  <Drawer anchor="right" open={featureOpen} onClose={() => toggleFeatureDrawer(false)}>
                    <Box
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        padding: "1rem",
                        color: "white",
                        height: "100vh"
                      }}
                    >
                      <User />
                      <Divider sx={{ m: "2rem" }} />
                      <Box onClick={() => toggleFeatureDrawer(false)}>
                        <Feature />
                      </Box>
                    </Box>
                  </Drawer>
                </Box>
              </>
            ) : (
              <>
                <Icon />
                <Feature />
                <User />
              </>
            )}

          </Toolbar>
        </Container>
      </GradientAppBar>
    </Box>
  )
}

