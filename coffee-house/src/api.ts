import { ProductsData } from "./interfaces";

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
