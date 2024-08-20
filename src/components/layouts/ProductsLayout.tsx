import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import CategoriesNav from "../navigation/categories/CategoriesNav";
import CategoriesNavDrawer from "../navigation/categories/CategoriesNavDrawer";

interface ProductsLayoutProps {
  children?: React.ReactNode;
}

export default function ProductsLayout(props: ProductsLayoutProps) {
  return (
    <Box display={"flex"} component="main" width={1630} maxWidth={"100%"} m={"0 auto 0 auto"}>
      <CategoriesNavDrawer>
        <CategoriesNav />
      </CategoriesNavDrawer>
      {props.children || <Outlet />}
    </Box>
  );
}
