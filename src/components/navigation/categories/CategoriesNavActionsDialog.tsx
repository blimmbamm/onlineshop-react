import { useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Category } from "../../../data/types";

export default function CategoriesNavActionsDialog(props: {
  open: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (inputs: Category) => void;
  category?: Category;
  resetOnSubmit?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>();

  function handleSubmit() {
    props.onSubmit({ name: inputRef.current?.value });
    handleClose();
  }

  function handleClose() {
    props.onClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      disableRestoreFocus
      sx={{ padding: 5 }}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <TextField
          variant="filled"
          size="small"
          hiddenLabel
          autoFocus
          inputRef={inputRef}
          defaultValue={props.category?.name || ""}
          sx={{ mb: 2 }}
        />
        <Box display="flex" justifyContent="end" gap={1}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Ok
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
