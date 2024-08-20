import { Category, CategoryNavType, Product } from "../data/types";

export type TypeFromKey<T> = T extends "product" | "products" | "addProduct"
  ? Product
  : T extends
      | "category"
      | "categories"
      | "subCategories"
      | "addCategory"
      | "patchCategory"
  ? Category
  : T extends "categoryForNav"
  ? CategoryNavType
  : never;

export type TypeFromOperation<T> = T extends "product" | "addProduct"
  ? Product
  : T extends "products"
  ? Product[]
  : T extends "category" | "addCategory" | "patchCategory"
  ? Category
  : T extends "categories"
  ? Category[]
  : T extends "categoryForNav"
  ? CategoryNavType
  : never;

export type Operation = "product" | "products" | "category" | "categoryForNav";

export type Flatten<T> = T extends any[] ? T[number] : T;

export type NestedProperty<T> = {
  [Key in keyof T]?: Array<
    keyof TypeFromKey<Key> | NestedProperty<TypeFromKey<Key>>
  >;
};

export type Fields<T> = Array<keyof Flatten<T> | NestedProperty<Flatten<T>>>;

export type MutationOperation = "addProduct" | "addCategory" | "patchCategory";

export type VariableType =
  | "String"
  | "Int"
  | "Float"
  | "Boolean"
  | "ID"
  | "ProductInput"
  | "CategoryInput";
