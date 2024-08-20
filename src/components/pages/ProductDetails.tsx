import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import placeholderImage from "../../assets/images/placeholder.png";
import { useParams } from "react-router-dom";
import ProductsCarousel from "../products/ProductsCarousel";
import { useProductDetailsQuery } from "../../hooks/queries/productQueries";

export default function ProductDetailsPage() {
  const params = useParams();

  const { data: product, isPending } = useProductDetailsQuery(params.id!);

  if (isPending)
    return (
      <Box m="auto" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Stack
      divider={<Divider orientation="horizontal" flexItem />}
      gap={2}
      m={2}
      p={3}
      bgcolor={"white"}
      flex={1}
      minWidth={0.5}
    >
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <img
            src={placeholderImage}
            style={{
              maxWidth: "100%",
              background: "white",
            }}
          />
        </Box>
        <Box display="flex" flexDirection="column" flex={1}>
          <Typography variant="h6">{product?.name}</Typography>
          <Typography variant="subtitle1">{product?.manufacturer}</Typography>
          <Typography variant="body1" mt={2}>
            {product?.description}
          </Typography>
          <Typography mt="auto" ml="auto" fontSize={30}>
            {product?.price}
          </Typography>
        </Box>
      </Box>
      {product?.categories?.map((category) => (
        <Box key={category.id}>
          <Typography variant="h6">
            Other products from {category.name}
          </Typography>
          <ProductsCarousel products={category.products} />
        </Box>
      ))}
    </Stack>
  );
}
