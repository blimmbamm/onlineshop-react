import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../products/ProductCard";
import AddProductDialog from "../products/AddProductDialog";
import { useDialog } from "../../hooks/useMenu";
import { useProductMutations } from "../../hooks/mutations/productMutations";
import { useCategoryProductsQuery } from "../../hooks/queries/productQueries";

export default function ProductsPage() {
  const {
    categoryId,
    products,
    isPending,
    addProductDialogOpen,
    toggleAddProductDialog,
    addProductHandler,
  } = useProducts();

  if (isPending)
    return (
      <Box display="flex" m="auto" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box padding={2} overflow="hidden" flex={1}>
      <Grid
        container
        spacing={2}
        mb={2}
        columns={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
        width={"100%"}
      >
        {products?.map((product) => (
          <Grid key={product.id} item xs={1} display="flex">
            <ProductCard product={product} description />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={toggleAddProductDialog}>
        Add product
      </Button>
      <AddProductDialog
        open={addProductDialogOpen}
        onClose={toggleAddProductDialog}
        onSubmit={addProductHandler}
        categoryId={categoryId}
      />
    </Box>
  );
}

function useProducts() {
  const [searchParams, _] = useSearchParams();

  const categoryId = searchParams.get("category");

  const { open: addProductDialogOpen, toggle: toggleAddProductDialog } =
    useDialog(() => {});

  const { data: products, isPending } = useCategoryProductsQuery(categoryId);

  const { addProductHandler } = useProductMutations(categoryId);

  return {
    categoryId,
    products,
    isPending,
    addProductDialogOpen,
    toggleAddProductDialog,
    addProductHandler,
  };
}
