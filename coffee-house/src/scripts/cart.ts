import { CartItemLocal } from "./interfaces";

function getLocalCart(): CartItemLocal[] {
  const cartJson = localStorage.getItem("cart");
  if (cartJson) {
    return JSON.parse(cartJson) as CartItemLocal[];
  } else {
    return [];
  }
}

export function addToCartLocal(item: CartItemLocal): void {
  const currentCart = getLocalCart();
  let found = false;

  for (let i = 0; i < currentCart.length; i++) {
    const cartItem = currentCart[i];

    if (
      cartItem.productId === item.productId &&
      cartItem.size === item.size &&
      JSON.stringify(cartItem.additives) === JSON.stringify(item.additives)
    ) {
      cartItem.quantity += 1;
      cartItem.totalItemPrice = cartItem.price * cartItem.quantity;
      found = true;
      break;
    }
  }

  if (!found) {
    currentCart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(currentCart));
}

export function updateCartInHeader() {
  const headerCartNum = document.querySelector(".header__cart-link-num");
  const cart = getLocalCart();
  let total = 0;
  for (const item of cart) {
    total += item.quantity;
  }
  if (headerCartNum) {
    headerCartNum.textContent = total.toString();
  }
}
