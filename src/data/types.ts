export interface NavItem {
  title: string;
  link: string;
  closeDrawerOnNavigate: boolean;
}

export interface Product {
  id?: string;
  categoryIds?: string[];
  name?: string;
  description?: string;
  manufacturer?: string;
  price?: number;
  priceFormatted?: string;
  categories?: Category[];
}

export interface Category {
  name?: string;
  id?: string;
  parentId?: string | null;
  leaf?: boolean;
  subCategories?: Category[];
  products?: Product[];
}

export interface CategoryNavType {
  category: Category | null;
  subCategories: Category[];
}
