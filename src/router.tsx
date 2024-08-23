import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import HomePage from "./components/pages/Home";
import RootError from "./components/pages/RootError";
import ProductsLayout from "./components/layouts/ProductsLayout";
import ProductsPage from "./components/pages/Products";
import ProductDetailsPage from "./components/pages/ProductDetails";
import AboutPage from "./components/pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootError />,
    children: [
      {
        index: true,
        element: <HomePage />,
      }, 
      {
        path: "products",
        element: <ProductsLayout />,
        // errorElement: <div>blabla product not found</div>,
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: ":id",
            element: <ProductDetailsPage />,
          },
        ],
      },
      {
        path: "about",
        element: <AboutPage />,


      }
    ],
  },
]);
