import { useRef } from "react";
import { Box, CircularProgress, IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import ProductCard from "./ProductCard";
import { Product } from "../../data/types";

export default function ProductsCarousel(props: { products?: Product[] }) {
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      height: 8,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "gray",
      borderRadius: 10,
      cursor: "pointer",
    },
  };

  const containerRef = useRef<HTMLDivElement>();

  const itemsRef = useRef<HTMLDivElement[]>([]);

  function handleScrollRight() {
    const scrollToItem = itemsRef.current.find(
      (item) =>
        item.getBoundingClientRect().x + item.getBoundingClientRect().width >
        window.innerWidth
    );
    scrollToItem?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  function handleScrollLeft() {
    // Scroll to first item in reverted order that is not entirely in viewport
    const scrollToItem = itemsRef.current
      .reverse()
      .find(
        (item) =>
          item.getBoundingClientRect().x <
          containerRef.current?.getBoundingClientRect().x!
      );
    scrollToItem?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    });
    itemsRef.current.reverse();
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      position="relative"
      width="100%"
      ref={containerRef}
    >
      <IconButton sx={{ position: "absolute" }} onClick={handleScrollLeft}>
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Box
        display="flex"
        alignItems="normal"
        width={"100%"}
        gap={2}
        p={2}
        sx={{
          overflow: "auto",
          ...scrollbarStyles,
        }}
      >
        {props.products?.map((product, index) => (
          <Box
            key={product.id}
            sx={{
              minWidth: {
                xs: "80%",
                sm: "45%",
                md: "30%",
                lg: "20%",
                display: "flex",
              },
            }}
            ref={(element: HTMLDivElement) =>
              (itemsRef.current[index] = element)
            }
          >
            <ProductCard product={product} />
          </Box>
        ))}
        {!props.products && (
          <Box m="auto">
            <CircularProgress />
          </Box>
        )}
      </Box>
      <IconButton
        sx={{ position: "absolute", right: 0 }}
        onClick={handleScrollRight}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
}
