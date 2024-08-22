import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import {
  useAddCategoryMutation,
  useEditCategoryMutation,
} from "../../../hooks/mutations/categoryMutations";
import CategoriesNavItem from "./CategoriesNavItem";
import CategoriesNavAddCategory from "./CategoriesNavAddCategory";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCategoriesForNavigationQuery } from "../../../hooks/queries/categoryQueries";
import { Category } from "../../../data/types";
import LoadingSpinner from "../../ui/LoadingSpinner";

export default function CategoriesNav(props: {
  onViewTopLevelCategories?: (value: boolean) => void;
  topListItem?: React.ReactNode;
  onClose?: () => void;
}) {
  const {
    data,
    isPending,
    createNavigateCategoriesHandler,
    handleNavigateCategories,
    createViewSubcategoriesHandler,
    handleNavigateBack,
  } = useCategoryNavigation({
    onViewTopLevelCategories: props.onViewTopLevelCategories,
  });

  const { createAddCategoryHandler } = useAddCategoryMutation();
  const { createEditCategoryHandler } = useEditCategoryMutation();

  if (isPending)
    return (
      <Box m="auto" mt={3}>
        <LoadingSpinner />
      </Box>
    );

  const { category, subCategories } = data!;

  return (
    <List disablePadding>
      {props.topListItem}
      {category && (
        <>
          <ListItem disablePadding divider>
            <ListItemButton
              onClick={handleNavigateBack}
              sx={{ "&:hover": { background: "transparent" } }}
            >
              <ListItemText primary="Back" />
            </ListItemButton>
          </ListItem>
          <ListItem divider sx={{ fontWeight: "bold" }}>
            {category.name}
          </ListItem>
        </>
      )}
      {subCategories.map((item, index) => (
        <CategoriesNavItem
          category={item}
          key={item.id}
          onViewSubcategories={createViewSubcategoriesHandler(item)}
          // onClick={createNavigateCategoriesHandler(item)}
          onClick={() => {
            handleNavigateCategories(item);
            props.onClose?.();
          }}
          divider={index === subCategories.length - 1}
          onEditCategory={createEditCategoryHandler(item)}
          onAddSubcategory={createAddCategoryHandler(item)}
          showCategoryOptionsHint={index === 0}
        />
      ))}
      <CategoriesNavAddCategory
        category={category}
        onSubmit={createAddCategoryHandler(category)}
      />
    </List>
  );
}

function useCategoryNavigation({
  onViewTopLevelCategories = (_value: boolean) => {},
}: {
  onViewTopLevelCategories?: (value: boolean) => void;
} = {}) {
  const navigation = useNavigate();
  const [searchParams, _] = useSearchParams();

  const [categoryId, setCategoryId] = useState<string | null>(
    searchParams.get("category")
  );

  const { data, isPending } = useCategoriesForNavigationQuery(categoryId);

  function createViewSubcategoriesHandler(category: Category) {
    return () => {
      if (!category.leaf) setCategoryId(category.id!);
    };
  }

  function handleNavigateCategories(category: Category) {
    navigation(`/products?category=${category.id}`);
    // setSearchParams({ category: category.id });
    setCategoryId(category.id!);
  }

  function createNavigateCategoriesHandler(category: Category) {
    return () => {
      navigation(`/products?category=${category.id}`);
      // setSearchParams({ category: category.id });
      setCategoryId(category.id!);
    };
  }

  function handleNavigateBack() {
    setCategoryId(data?.category?.parentId!);
  }

  // Effect is needed in case there is a search param and user goes to /products by navbar
  useEffect(() => {
    if (!searchParams.get("category")) {
      setCategoryId(null);
    }
  }, [searchParams]);

  useEffect(() => {
    onViewTopLevelCategories(!Boolean(data?.category));
  });

  return {
    data,
    isPending,
    createNavigateCategoriesHandler,
    handleNavigateCategories,
    createViewSubcategoriesHandler,
    handleNavigateBack,
  };
}
