import { ProductsData, SingleProductResponse } from "./interfaces";

const allProductsUrl =
  "http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products";

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
  const singleProductUrl = `http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products/${productId}`;
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
