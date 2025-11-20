import { CartItemLocal } from "./interfaces";

export function calcTotalPrice(cart: CartItemLocal[]): string {
  let total = 0;
  for (const item of cart) {
    total += item.totalItemPrice;
  }
  return total.toFixed(2);
}
