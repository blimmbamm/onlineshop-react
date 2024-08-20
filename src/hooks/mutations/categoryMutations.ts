import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "../../data/types";
import { mutation } from "../../api/mutation";
import { MutationKeys, QueryKeys } from "../queries/keys";
import { useAlert } from "../../components/ui/AlertProvider";

export function useAddCategoryMutation() {
  const queryClient = useQueryClient();

  const alert = useAlert();

  const addCategoryMutation = useMutation({
    mutationKey: [MutationKeys.ADD_CATEGORY],
    mutationFn: async (args: { inputs: Category }) =>
      mutation<"addCategory">({
        operation: "addCategory",
        fields: ["id"],
        variables: { inputs: { type: "CategoryInput", value: args.inputs } },
      }),
    onError: (error) => alert({ severity: "error", message: error.message }),
    onSuccess: (_, variables) => {
      alert({
        severity: "success",
        message: `Added category ${variables.inputs.name}`,
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CATEGORY_FOR_NAVIGATION],
      });
    },
  });

  function createAddCategoryHandler(category: Category | null) {
    return function (inputs: Category) {
      addCategoryMutation.mutate({
        inputs: { ...inputs, parentId: category?.id ?? null, leaf: true },
      });
    };
  }

  return { createAddCategoryHandler };
}

export function useEditCategoryMutation() {
  const queryClient = useQueryClient();

  const alert = useAlert();

  const editCategoryMutation = useMutation({
    mutationKey: [MutationKeys.EDIT_CATEGORY],
    mutationFn: async (args: { category: Category; inputs: Category }) =>
      mutation<"patchCategory">({
        operation: "patchCategory",
        fields: ["id"],
        variables: {
          id: { type: "ID", value: args.category.id },
          inputs: { type: "CategoryInput", value: args.inputs },
        },
      }),
    onError: (error) =>
      alert({
        severity: "error",
        message: error.message,
      }),
    onSuccess: (_, variables) => {
      alert({
        severity: "success",
        message: `Edited category ${variables.inputs.name}`,
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CATEGORY_FOR_NAVIGATION],
      });
    },
  });

  function createEditCategoryHandler(category: Category) {
    return function (inputs: Category) {
      editCategoryMutation.mutate({
        category,
        inputs,
      });
    };
  }

  return {
    createEditCategoryHandler,
  };
}
