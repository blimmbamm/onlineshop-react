import { Menu, MenuItem } from "@mui/material";
import { useDialog } from "../../../hooks/useMenu";
import CategoriesNavActionsDialog from "./CategoriesNavActionsDialog";
import { Category } from "../../../data/types";

export default function CategoriesNavMenu(props: {
  category: Category;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onEditCategory: (inputs: Category) => void;
  onAddSubcategory: (inputs: Category) => void;
}) {
  const { open: addDialogOpen, toggle: toggleAddDialog } = useDialog(
    props.onClose
  );

  const { open: editDialogOpen, toggle: toggleEditDialog } = useDialog(
    props.onClose
  );

  return (
    <>
      <Menu
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        onClose={props.onClose}
        disableScrollLock
      >
        <MenuItem onClick={toggleEditDialog}>Edit</MenuItem>
        <MenuItem onClick={toggleAddDialog}>Add sub category</MenuItem>
        <MenuItem onClick={props.onClose}>Close</MenuItem>
      </Menu>
      <CategoriesNavActionsDialog
        open={addDialogOpen}
        onSubmit={props.onAddSubcategory}
        title="Add sub category"
        onClose={toggleAddDialog}
        resetOnSubmit
      />
      <CategoriesNavActionsDialog
        category={props.category}
        open={editDialogOpen}
        onSubmit={props.onEditCategory}
        title="Edit category"
        onClose={toggleEditDialog}
        // resetOnSubmit
      />
    </>
  );
}
