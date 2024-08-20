import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavigationBar from "../navigation/NavigationBar";

interface RootLayoutProps {
  children?: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <>
      <CssBaseline  />
      <NavigationBar />
      {props.children || <Outlet />}
    </>
  );
}
