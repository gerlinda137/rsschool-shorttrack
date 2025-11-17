import { CartItemLocal } from "./interfaces";

export function getLocalCart(): CartItemLocal[] {
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
      cartItem.size.size === item.size.size &&
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

export function removeFromCart(itemToRemove: CartItemLocal): void {
  const currentCart = getLocalCart();
  const updatedCart = currentCart.filter(
    (item) =>
      !(
        item.productId === itemToRemove.productId &&
        item.size.size === itemToRemove.size.size &&
        JSON.stringify(item.additives) ===
          JSON.stringify(itemToRemove.additives)
      )
  );
  localStorage.setItem("cart", JSON.stringify(updatedCart));
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
