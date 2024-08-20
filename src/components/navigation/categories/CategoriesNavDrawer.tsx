import { Drawer, Toolbar } from "@mui/material";

export default function CategoriesNavDrawer(props: {
  children: React.ReactNode;
}) {
  const drawerWidth = 200;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        display: { xs: "none", sm: "block" },
      }}
      PaperProps={{ sx: { width: drawerWidth, left: "auto" } }}
    >
      <Toolbar />
      {props.children}
    </Drawer>
  );
}
