import {
  FavoritesResponse,
  ProductsData,
  SingleProductResponse,
} from "./interfaces";

const allProductsUrl =
  "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products";

export async function getAllProducts(): Promise<ProductsData> {
  try {
    const response = await fetch(allProductsUrl);
    if (!response.ok) {
      throw new Error("HTTP request error:" + response.status);
    }
    const data: ProductsData = await response.json();
    return data;
  } catch (error) {
    console.log("failed to load products" + error);
    throw new Error("failed to load products" + error);
  }
}

export async function getSingleProduct(
  productId: string
): Promise<SingleProductResponse> {
  const singleProductUrl = `https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/${productId}`;
  try {
    const response = await fetch(singleProductUrl);
    if (!response.ok) {
      throw new Error("HTTP request error:" + response.status);
    }
    const data: SingleProductResponse = await response.json();
    return data;
  } catch (error) {
    console.log("failed to load product" + error);
    throw new Error("failed to load product" + error);
  }
}

const favProductsUrl =
  "'https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/favorites'";

export async function getFavProducts(): Promise<FavoritesResponse> {
  try {
    const response = await fetch(favProductsUrl);
    if (!response.ok) {
      throw new Error("HTTP request error:" + response.status);
    }
    const data: FavoritesResponse = await response.json();
    return data;
  } catch (error) {
    console.log("failed to load favorite products" + error);
    throw new Error("failed to favorite load products" + error);
  }
}
