import { useQuery } from "@tanstack/react-query";
import { query } from "../../api/query";
import { QueryKeys } from "./keys";

export function useCategoriesForNavigationQuery(categoryId: string | null) {
  return useQuery({
    queryKey: [QueryKeys.CATEGORY_FOR_NAVIGATION, categoryId],
    queryFn: () =>
      query<"categoryForNav">({
        operation: "categoryForNav",
        fields: [
          { category: ["id", "name", "parentId", "leaf"] },
          { subCategories: ["id", "name", "parentId", "leaf"] },
        ],
        variables: { id: { type: "ID", value: categoryId } },
      }),
  });
}

export function useCategoryQuery(args: {
  categoryId: string | null;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: [QueryKeys.CATEGORY, args.categoryId],
    throwOnError: false,
    queryFn: () =>
      query<"category">({
        operation: "category",
        fields: [
          "id",
          "name",
          "parentId",
          "leaf",
          { subCategories: ["id", "name", "parentId", "leaf"] },
        ],
        variables: { id: { type: "ID", value: args.categoryId } },
      }),
    enabled: args.enabled,
  });
}
