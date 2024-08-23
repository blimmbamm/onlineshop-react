import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import { Box, Typography } from "@mui/material";

export default function RootError() {
  const error = useRouteError();

  let message: string = "Something went wrong";

  if (isRouteErrorResponse(error) && error.status === 404) {
    message = "Page not found";
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = "An unknown error occurred";
  }

  return (
    <RootLayout>
      <Box textAlign="center" mt={5} display="flex" flexDirection="column" gap={3}>
        <Typography variant="h4">Something went wrong</Typography>
        <Typography>{message}</Typography>
      </Box>
    </RootLayout>
  );
}
