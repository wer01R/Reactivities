import { Group } from "@mui/icons-material";
import { Box, Button, CircularProgress, Container, Toolbar, Typography } from "@mui/material";
import { GradientAppBar } from "./GradientAppBar";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { Observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";


export default function NavBar() {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <GradientAppBar>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
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
                      }}
                    />)
                  }
                </Observer>
              </Button>
            </Box>
            <Box sx={{ display: 'flex' }}>
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

            <Box display='flex' alignItems='center' >
              {currentUser ? (
                <UserMenu />
              ) : (
                <>
                  <MenuItemLink to='/login'>Login</MenuItemLink>
                  <MenuItemLink to='/register'>Register</MenuItemLink>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </GradientAppBar>
    </Box>
  )
}

