import { useQuery } from "@tanstack/react-query";
import { query } from "../../api/query";
import { QueryKeys } from "./keys";

export function useCategoryProductsQuery(categoryId: string | null) {
  const filter = categoryId
    ? JSON.stringify({ categoryIds: categoryId })
    : null;

  return useQuery({
    queryKey: [QueryKeys.PRODUCTS, categoryId],
    queryFn: () =>
      query<"products">({
        operation: "products",
        fields: ["id", "name", "description", "manufacturer", "priceFormatted"],
        variables: { filter: { type: "String", value: filter } },
      }),
  });
}

export function useProductDetailsQuery(productId: string) {
  return useQuery({
    queryKey: [QueryKeys.PRODUCT, productId],
    queryFn: () =>
      query<"product">({
        operation: "product",
        fields: [
          "id",
          "name",
          "name",
          "description",
          "manufacturer",
          "priceFormatted",
          {
            categories: [
              "id",
              "name",
              {
                products: [
                  "id",
                  "name",
                  "description",
                  "manufacturer",
                  "priceFormatted",
                ],
              },
            ],
          },
        ],
        variables: {
          id: { type: "ID", value: productId },
        },
      }),
  });
}

export function useRecentlyViewedProducts() {
  return useQuery({
    queryKey: [QueryKeys.PRODUCTS, QueryKeys.RECENTLY_VIEWED],
    queryFn: () =>
      query<"products">({
        operation: "products",
        fields: ["id", "name", "manufacturer", "priceFormatted"],
        variables: {
          options: {
            type: "String",
            value: JSON.stringify({ sort: { lastViewed: -1 }, limit: 10 }),
          },
        },
      }),
  });
}
