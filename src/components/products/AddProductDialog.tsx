import { SyntheticEvent, useEffect, useState } from "react";
import { useInputs } from "../../hooks/useInputs";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCategoryQuery } from "../../hooks/queries/categoryQueries";
import { Category, Product } from "../../data/types";

export default function AddProductDialog(props: {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  categoryId: string | null;
}) {
  const {
    inputs,
    createInputsChangeHandler,
    handleAddProduct,
    category,
    isPending,
    isError,
    categorySelection,
    handleAddCategoryToSelection,
    createRemoveCategoryFromSelectionHandler,
    handleClose,
  } = useAddProduct({
    categoryId: props.categoryId,
    onSubmit: props.onSubmit,
    onClose: props.onClose,
    queryEnabled: props.open,
  });

  let dialogContent: React.ReactNode;
  if (isError) {
    dialogContent = <Typography m={3}>Something went wrong</Typography>;
  } else {
    dialogContent = (
      <>
        <DialogTitle>Add new product</DialogTitle>
        <DialogContent>
          <Stack gap={2} component="form" onSubmit={handleAddProduct}>
            <Typography>Details:</Typography>
            <TextField
              variant="filled"
              size="small"
              label="Name"
              value={inputs.name}
              onChange={createInputsChangeHandler("name")}
            />
            <TextField
              variant="filled"
              size="small"
              label="Description"
              multiline
              value={inputs.description}
              onChange={createInputsChangeHandler("description")}
            />
            <TextField
              variant="filled"
              size="small"
              label="Manufacturer"
              value={inputs.manufacturer}
              onChange={createInputsChangeHandler("manufacturer")}
            />
            <TextField
              variant="filled"
              size="small"
              label="Price"
              inputProps={{ step: 0.01 }}
              type="number"
              value={inputs.price}
              onChange={createInputsChangeHandler("price")}
            />

            <Divider />
            <Typography>Categories:</Typography>
            {isPending && (
              <Box m="auto">
                <CircularProgress />
              </Box>
            )}

            {categorySelection
              .filter(({ fixed }) => fixed)
              .map(({ category }) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  sx={{ width: "fit-content" }}
                />
              ))}
            {categorySelection
              .filter(({ fixed }) => !fixed)
              .map(({ category }) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  onDelete={createRemoveCategoryFromSelectionHandler(category)}
                  sx={{ width: "fit-content" }}
                />
              ))}
            {!category?.leaf && (
              <FormControl variant="filled">
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  value={""}
                  onChange={handleAddCategoryToSelection}
                >
                  {category?.subCategories?.map((subCategory) => (
                    <MenuItem value={subCategory.id} key={subCategory.id}>
                      {subCategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <Box display="flex" justifyContent="end" gap={1}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" type="submit">
                Ok
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </>
    );
  }

  return (
    <Dialog open={props.open} onClose={handleClose}>
      {dialogContent}
    </Dialog>
  );
}

function useAddProduct(args: {
  categoryId: string | null;
  queryEnabled: boolean;
  onSubmit: (product: Product) => void;
  onClose: () => void;
}) {
  const {
    values: inputs,
    createChangeHandler: createInputsChangeHandler,
    reset: resetInputs,
  } = useInputs({
    name: "",
    description: "",
    manufacturer: "",
    price: "",
  });

  const [categorySelection, setCategorySelection] = useState<
    { category: Category; fixed: boolean }[]
  >([]);

  const [isInitial, setIsInitial] = useState(true);

  const categoryId =
    categorySelection[categorySelection.length - 1]?.category.id ||
    args.categoryId;

  const {
    data: category,
    isPending,
    isError,
  } = useCategoryQuery({
    categoryId,
    enabled: args.queryEnabled,
  });

  // Add category from search params to list if there is one:
  useEffect(() => {
    if (category && isInitial) {
      setIsInitial(false);
      if (category.id) {
        setCategorySelection([{ category, fixed: true }]);
      }
    }
  }, [category]);

  function handleAddProduct(event: SyntheticEvent) {
    event.preventDefault();
    args.onSubmit({
      ...inputs,
      price: +inputs.price,
      categoryIds: categorySelection.map(({ category }) => category.id!),
    });

    reset();
    args.onClose();
  }

  function handleAddCategoryToSelection(event: SelectChangeEvent) {
    setCategorySelection((prevList) => [
      ...prevList,
      {
        category: category?.subCategories?.find(
          (category) => category.id === event.target.value
        )!,
        fixed: false,
      },
    ]);
  }

  function createRemoveCategoryFromSelectionHandler(category: Category) {
    return function handleRemoveCat() {
      setCategorySelection((prevList) => {
        const index = prevList.findIndex(
          (item) => item.category.id === category.id
        );
        return prevList.slice(0, index);
      });
    };
  }

  function resetCategories() {
    setIsInitial(true);
    // setCategorySelection([]);
    setCategorySelection(prevSelection => prevSelection.filter(item => item.fixed))
  }

  function reset() {
    resetInputs();
    resetCategories();
  }

  function handleClose() {
    reset();
    args.onClose();
  }

  return {
    inputs,
    createInputsChangeHandler,
    handleAddProduct,
    category,
    isPending,
    isError,
    categorySelection,
    handleAddCategoryToSelection,
    createRemoveCategoryFromSelectionHandler,
    handleClose,
  };
}
