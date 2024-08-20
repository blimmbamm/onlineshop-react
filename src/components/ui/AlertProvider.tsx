import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

interface AlertContextType {
  showAlert: (args: { severity: "error" | "success"; message: string }) => void;
}

export const AlertContext = createContext<AlertContextType>({
  showAlert: () => {},
});

export default function AlertProvider(props: { children: React.ReactNode }) {
  const defaultAlert: {
    visible: boolean;
    severity: "error" | "success" | undefined;
    message: string;
  } = {
    visible: false,
    severity: undefined,
    message: "",
  };
  const [alert, setAlert] = useState(defaultAlert);

  function showAlert(args: { severity: "error" | "success"; message: string }) {
    setAlert({ visible: true, ...args });
  }

  function hideAlert() {
    setAlert((alert) => ({ ...alert, visible: false }));
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {props.children}
      <Snackbar
        open={alert.visible}
        autoHideDuration={3000}
        onClose={hideAlert}
      >
        <Alert severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const alertContext = useContext(AlertContext);
  return alertContext.showAlert;
}
