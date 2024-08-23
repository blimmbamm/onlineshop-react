import { mutation as gqlMutation } from "gql-query-builder";
import {
  Fields,
  MutationOperation,
  TypeFromKey,
  TypeFromOperation,
} from "./types";
import IQueryBuilderOptions from "gql-query-builder/build/IQueryBuilderOptions";

export async function mutation<T extends MutationOperation>(args: {
  operation: T;
  fields: Fields<TypeFromKey<T>>;
  variables?: { [variable: string]: { type: string; value: any } };
}): Promise<TypeFromOperation<T>> {
  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gqlMutation(args as IQueryBuilderOptions)),
    });

    const { data, errors } = await response.json();

    if (errors) {
      // If gql returns errors, throw first of these errors
      throw errors[0];
    }

    return data[args.operation];
  } catch (error) {
    // Either fetch failed or gql returned errors
    if (error instanceof Error) {
      error.message = "Something went wrong";
    }

    throw error;
  }
}
