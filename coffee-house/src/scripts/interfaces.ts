export interface Additive {
  name: string;
  price: string;
  discountPrice?: string;
}

export interface Size {
  size: string;
  price: string;
  discountPrice?: string;
}

export interface Sizes {
  s: Size;
  m: Size;
  l: Size;
  xl: Size;
}

export type Category = "coffee" | "tea" | "dessert";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: Category;
}

export interface ProductsData {
  data: Product[];
  message: string;
  error: string;
}

export interface SingleProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: Category;
  sizes: Sizes;
  additives: Additive[];
}

export interface SingleProductResponse {
  data: Product;
  message: string;
  error: string;
}

export interface CartItemLocal {
  productId: string;
  name: string;
  size: Size;
  additives: string[];
  quantity: number;
  price: number;
  totalItemPrice: number;
}

export interface FavoriteProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: Category;
}

export interface FavoritesResponse {
  data: FavoriteProduct[];
}

export interface FormData {
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
}

export interface UserData {
  login: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
}

interface OrderItem {
  productId: number;
  size: string;
  additives: string[];
  quantity: number;
}

export interface OrderData {
  items: OrderItem[];
  totalPrice: number;
}
