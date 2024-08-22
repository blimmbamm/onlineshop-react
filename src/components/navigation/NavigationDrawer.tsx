import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { DISPLAY_HIDE_IN_DESKTOP } from "./NavigationBar";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import CategoriesNav from "./categories/CategoriesNav";
import { NAV_ITEMS } from "../../data/navigation";
import { NavItem } from "../../data/types";

export default function NavigationDrawer(props: {
  open: boolean;
  onClose: () => void;
}) {
  const navItems: NavItem[] = [
    { title: "Home", link: "/", closeDrawerOnNavigate: true },
    ...NAV_ITEMS,
  ];

  const drawerWidth = 200;

  const {
    backToTopLevelEnabled,
    handleBackToTopLevel,
    handleBackToTopLevelEnabled,
    setOnHomeNavigation,
    showCategoriesNavigation,
    showHomeNavigation,
  } = useNavigationDrawer();

  function createTopLevelNavigationHandler(navItem: NavItem) {
    return () => {
      setOnHomeNavigation(navItem.link !== "/products");
      if (navItem.closeDrawerOnNavigate) {
        props.onClose();
      }
    };
  }

  const backToTopButton = backToTopLevelEnabled && (
    <ListItem disablePadding divider>
      <ListItemButton onClick={handleBackToTopLevel}>
        <ListItemText primary="Back" />
      </ListItemButton>
    </ListItem>
  );

  const categoriesNavigation = (
    <CategoriesNav
      onViewTopLevelCategories={handleBackToTopLevelEnabled}
      topListItem={backToTopButton}
      onClose={props.onClose}
    />
  );

  const homeNavigation = (
    <List>
      {navItems.map((navItem) => (
        <ListItem disablePadding key={navItem.title}>
          <ListItemButton
            onClick={createTopLevelNavigationHandler(navItem)}
            component={RouterLink}
            to={navItem.link}
          >
            <ListItemText primary={navItem.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer
      variant="temporary"
      open={props.open}
      onClose={props.onClose}
      ModalProps={{
        disableScrollLock: true,
        keepMounted: false,
      }}
      PaperProps={{ sx: { width: drawerWidth } }}
      sx={{ display: DISPLAY_HIDE_IN_DESKTOP, width: drawerWidth }}
    >
      <Toolbar />
      {showCategoriesNavigation && categoriesNavigation}
      {showHomeNavigation && homeNavigation}
    </Drawer>
  );
}

function useNavigationDrawer() {
  const location = useLocation();

  const onProductsPage = location.pathname === "/products";
  const [onHomeNavigation, setOnHomeNavigation] = useState(!onProductsPage);

  const showCategoriesNavigation = onProductsPage && !onHomeNavigation;
  const showHomeNavigation = !onProductsPage || onHomeNavigation;

  const [backToTopLevelEnabled, setBackToTopLevelEnabled] = useState(true);

  function handleBackToTopLevelEnabled(value: boolean) {
    setBackToTopLevelEnabled(value);
  }

  function handleBackToTopLevel() {
    setOnHomeNavigation(true);
  }

  return {
    showCategoriesNavigation,
    showHomeNavigation,
    backToTopLevelEnabled,
    handleBackToTopLevel,
    handleBackToTopLevelEnabled,
    setOnHomeNavigation,
  };
}
