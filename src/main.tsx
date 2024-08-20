import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Theme, ThemeProvider, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import AlertProvider from "./components/ui/AlertProvider.tsx";

const theme: Theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: grey[300],
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, throwOnError: true } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <AlertProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AlertProvider>
      </CookiesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
