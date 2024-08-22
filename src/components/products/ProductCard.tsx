import { Box, Card, CardMedia, Typography } from "@mui/material";
import placeholderImage from "../../assets/images/placeholder.png";
import { Link as RouterLink } from "react-router-dom";
import { Product } from "../../data/types";

interface ProductCardProps {
  product: Product;
  description?: boolean;
}

export default function ProductCard(props: ProductCardProps) {
  const { product } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        gap: 2,
        width: "100%",
      }}
      elevation={1}
    >
      <Box
        p={0}
        margin="0 auto 0 auto"
        component={RouterLink}
        to={`/products/${product.id}`}
      >
        <CardMedia
          width="auto"
          component="img"
          src={placeholderImage}
          sx={{ maxWidth: 150 }}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        flex={1}
        width="100%"
      >
        <Box>
          <Typography
            variant="h6"
            component={RouterLink}
            to={`/products/${product.id}`}
            sx={{
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
              color: "inherit",
            }}
          >
            {product.name}
          </Typography>
          <Typography variant="subtitle1">{product.manufacturer}</Typography>
          {props.description && <Typography>{product.description}</Typography>}
        </Box>
        <Typography sx={{ display: "flex", justifyContent: "flex-end" }}>
          {product.priceFormatted}
        </Typography>
      </Box>
    </Card>
  );
}
