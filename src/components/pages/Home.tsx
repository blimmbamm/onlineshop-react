import { Stack, Typography } from "@mui/material";

import ProductsCarousel from "../products/ProductsCarousel";
import { useRecentlyViewedProducts } from "../../hooks/queries/productQueries";

export default function HomePage() {
  const { data: products } = useRecentlyViewedProducts();

  return (
    <Stack direction="column" p={2} spacing={3} width={"100%"}>
      <Typography variant="h6">Recently viewed products</Typography>
      <ProductsCarousel products={products} />
    </Stack>
  );
}
