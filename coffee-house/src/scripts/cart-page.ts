import { getLocalCart } from "./cart";
import { CartItemLocal } from "./interfaces";
const cartList = document.querySelector(".cart-items");
const template = document.getElementById(
  "cart-item-template"
) as HTMLTemplateElement;

export function generateCartList(cartItems: CartItemLocal[]) {
  for (const cartItem of cartItems) {
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const quantity = clone.querySelector(".item__quantity") as HTMLSpanElement;
    const title = clone.querySelector(".item__title") as HTMLHeadingElement;
    const info = clone.querySelector(".item__info") as HTMLSpanElement;
    const currentPrice = clone.querySelector(
      ".item__price--cur"
    ) as HTMLSpanElement;
    const img = clone.querySelector(".item__img") as HTMLImageElement;

    if (cartItem.quantity > 1) {
      quantity.textContent = `${cartItem.quantity}`;
    }

    title.textContent = cartItem.name;
    let infoText = cartItem.size.size;
    if (cartItem.additives.length > 0) {
      infoText += `, ${cartItem.additives.join(", ")}`;
    }
    info.textContent = infoText;
    currentPrice.textContent = `$${cartItem.totalItemPrice}`;
    img.src = `img/cards/${cartItem.name}.jpg`;
    img.alt = `${cartItem.name} image`;
    cartList?.append(clone);
  }
}

const localCart = getLocalCart();
generateCartList(localCart);
