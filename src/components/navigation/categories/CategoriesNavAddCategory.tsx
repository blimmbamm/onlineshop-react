import { useState } from "react";
import { Box, Button, IconButton, ListItem, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Category } from "../../../data/types";

export default function CategoriesNavAddCategory(props: {
  category: Category | null; // maybe rename to parentCategory
  onSubmit: (inputs: Category) => void;
}) {
  const [inputEnabled, setInputEnabled] = useState(false);

  function toggleEnabled() {
    setInputEnabled((prevEnabled) => !prevEnabled);
    setInputValue("");
  }
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function submitCategory() {
    props.onSubmit({name: inputValue});
    toggleEnabled();
  }

  const input = (
    <Box>
      <TextField
        autoFocus
        hiddenLabel
        size="small"
        variant="filled"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Box display="flex" justifyContent="center">
        <IconButton onClick={submitCategory}>
          <CheckIcon />
        </IconButton>
        <IconButton onClick={toggleEnabled}>
          <ClearIcon />
        </IconButton>
      </Box>
    </Box>
  );

  const button = (
    <Button variant="contained" onClick={toggleEnabled}>
      Add category
    </Button>
  );

  return <ListItem>{inputEnabled ? input : button}</ListItem>;
}
