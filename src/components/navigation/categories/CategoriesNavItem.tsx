import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Popper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useMenu from "../../../hooks/useMenu";
import { grey } from "@mui/material/colors";
import { ArrowRight } from "@mui/icons-material";
import CategoriesNavMenu from "./CategoriesNavMenu";
import { Category } from "../../../data/types";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

export default function CategoriesNavigationItem(props: {
  category: Category;
  onViewSubcategories: () => void;
  onClick: () => void;
  divider?: boolean;
  onEditCategory: (inputs: Category) => void;
  onAddSubcategory: (inputs: Category) => void;
  showCategoryOptionsHint?: boolean;
}) {
  const { anchorEl, handleOpenMenu, handleCloseMenu } = useMenu();

  const optionsHintAnchorRef = useRef<HTMLParagraphElement>();

  const [cookies, _] = useCookies(["CategoryOptionsHint"]);

  const showCategoryOptionsHint =
    props.showCategoryOptionsHint && !cookies.CategoryOptionsHint;

  return (
    <>
      <ListItem disablePadding divider={props.divider}>
        <Box
          display="flex"
          width="100%"
          sx={{ "&:hover": { backgroundColor: grey[100] } }}
        >
          <ListItemButton
            onContextMenu={handleOpenMenu}
            onClick={props.onClick}
            sx={{ "&:hover": { background: "transparent" } }}
          >
            <ListItemText
              ref={optionsHintAnchorRef}
              primary={props.category.name}
            />
          </ListItemButton>
          {!props.category.leaf && (
            <Box display="flex" flexDirection="column" justifyContent="center">
              <IconButton
                onClick={props.onViewSubcategories}
                sx={{
                  "&:hover": { background: "transparent", color: "green" },
                }}
                size="small"
              >
                <ArrowRight />
              </IconButton>
            </Box>
          )}
        </Box>
      </ListItem>
      {showCategoryOptionsHint && (
        <CategoryOptionsHint anchorElRef={optionsHintAnchorRef} />
      )}
      <CategoriesNavMenu
        category={props.category}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        onEditCategory={props.onEditCategory}
        onAddSubcategory={props.onAddSubcategory}
      />
    </>
  );
}

function CategoryOptionsHint(props: {
  anchorElRef: MutableRefObject<HTMLElement | undefined>;
}) {
  const [anchorPopper, setAnchorPopper] = useState<HTMLElement | null>(null);

  const popperOpen = Boolean(anchorPopper);

  const [_, setCookies] = useCookies(["CategoryOptionsHint"]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const hintText = isMobile
    ? "Press and hold for options"
    : "Right-click for options";

  useEffect(() => {
    setTimeout(() => {
      if (props.anchorElRef.current?.checkVisibility()) {
        setAnchorPopper(props.anchorElRef.current || null);
      }
    }, 500);
  }, []);

  function handleAddCookie() {
    setCookies("CategoryOptionsHint", {});
  }

  return (
    <Popper
      sx={{
        zIndex: 65000,
        bgcolor: grey[400],
        overflow: "visible",
        "&:before": {
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          left: 50,
          width: 10,
          height: 10,
          backgroundColor: "inherit",
          transform: "translateY(-50%) rotate(45deg)",
          boxShadow: "-3px -3px 5px -2px rgba(0,0,0,0.1)",
        },
      }}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [50, 10],
          },
        },
      ]}
      open={popperOpen}
      anchorEl={anchorPopper}
      onClick={() => {
        setAnchorPopper(null);
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography p={1}>{hintText}</Typography>
        <Button sx={{ m: 1 }} onClick={handleAddCookie}>
          Ok
        </Button>
      </Box>
    </Popper>
  );
}
