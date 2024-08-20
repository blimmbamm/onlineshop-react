import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutation } from "../../api/mutation";
import { Product } from "../../data/types";
import { MutationKeys, QueryKeys } from "../queries/keys";
import { useAlert } from "../../components/ui/AlertProvider";

export function useProductMutations(categoryId: string | null) {
  const queryClient = useQueryClient();

  const alert = useAlert();

  const addProductMutation = useMutation({
    mutationKey: [MutationKeys.ADD_PRODUCT],
    mutationFn: async (args: { inputs: Product }) =>
      await mutation<"addProduct">({
        operation: "addProduct",
        fields: ["id", "name"],
        variables: { inputs: { type: "ProductInput", value: args.inputs } },
      }),
    onError: (error) =>
      alert({
        severity: "error",
        message: error.message,
      }),
    onSuccess: () => {
      alert({
        severity: "success",
        message: "Successfully added product",
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTS, categoryId],
      });
    },
  });

  function addProductHandler(product: Product) {
    addProductMutation.mutate({ inputs: product });
  }

  return {
    addProductHandler,
  };
}
