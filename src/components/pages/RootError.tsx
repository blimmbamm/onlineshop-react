import {
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

export default function RootError() {
  const error = useRouteError();
  console.log(error);

  // Better:
  // Check if route error response
  // Check if instance of Error
  // else "unknown error"

  let message: string = "Something went wrong";

  if (isRouteErrorResponse(error) && error.status === 404) {
    message = "Page not found";
  } else if(error instanceof Error) {
    console.log('instance of error case');
    console.log(error.message);
    
    message = error.message;
  } else {
    message = "An unknown error occurred";
  }

  return (
    <RootLayout>
      <h2>Root error page</h2>
      <p>{message}</p>
    </RootLayout>
  );
}
