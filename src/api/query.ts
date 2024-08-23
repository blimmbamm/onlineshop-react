import { query as gqlQuery } from "gql-query-builder";
import { Fields, Operation, TypeFromKey, TypeFromOperation, VariableType } from "./types";
import IQueryBuilderOptions from "gql-query-builder/build/IQueryBuilderOptions";

export async function query<T extends Operation>(args: {
  operation: T;
  fields: Fields<TypeFromKey<T>>;
  variables?: { [variable: string]: { type: VariableType; value: any } };
}): Promise<TypeFromOperation<T>> {
  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gqlQuery(args as IQueryBuilderOptions)),
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message)
    }

    return data[args.operation];
  } catch (error) {
    // Either fetch failed or gql returned errors
    // if (error instanceof Error) {
    //   error.message = "Something went wrong";
    // }

    throw error;
  }
}
