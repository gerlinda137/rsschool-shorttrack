export interface Additive {
  name: string;
  "add-price": string;
}

export interface Size {
  size: string;
  "add-price": string;
}

export interface Sizes {
  s: Size;
  m: Size;
  l: Size;
}

export type Category = "coffee" | "tea" | "dessert";

export interface Product {
  name: string;
  description: string;
  price: string;
  category: Category;
  sizes: Sizes;
  additives: Additive[];
}

export interface ProductsData {
  products: Product[];
}
