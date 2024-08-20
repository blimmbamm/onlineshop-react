import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";
import NavigationDrawer from "./NavigationDrawer";
import { NAV_ITEMS } from "../../data/navigation";

export const DISPLAY_HIDE_IN_MOBILE = { xs: "none", sm: "flex" };
export const DISPLAY_HIDE_IN_DESKTOP = { xs: "block", sm: "none" };

export default function NavigationBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleMobileClose() {
    setMobileOpen(false);
  }

  function handleMobileToggle() {
    setMobileOpen((prevOpen) => !prevOpen);
  }

  return (
    <AppBar
      position="sticky"
      variant="elevation"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth={false} disableGutters component="nav">
        <Toolbar variant="regular" sx={{ gap: 1 }}>
          <IconButton
            sx={{ display: { sm: "none" } }}
            onClick={handleMobileToggle}
            color="inherit"
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <IconButton
            sx={{ display: DISPLAY_HIDE_IN_MOBILE }}
            color="inherit"
            component={RouterLink}
            to="/"
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <Box display={DISPLAY_HIDE_IN_MOBILE}>
            {NAV_ITEMS.map((navItem) => (
              <Button
                variant="text"
                color="inherit"
                key={navItem.title}
                component={RouterLink}
                to={navItem.link}
                sx={{ mr: 1, textWrap: "nowrap" }}
              >
                {navItem.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
      <NavigationDrawer open={mobileOpen} onClose={handleMobileClose} />
    </AppBar>
  );
}
