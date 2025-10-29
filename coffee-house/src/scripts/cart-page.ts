import { calcTotalPrice } from "./calcTotalPrice";
import { getLocalCart, removeFromCart, updateCartInHeader } from "./cart";
import { confirmOrder } from "./confirmOrder";
import { CartItemLocal } from "./interfaces";
import { getUserData } from "./user";
const cartList = document.querySelector(".cart-items");
const template = document.getElementById(
  "cart-item-template"
) as HTMLTemplateElement;
const cartTotalPrice = document.querySelector(".cart-total__price");

const authBtns = document.querySelector(".auth-btns");
const authedInfo = document.querySelector(".authed-info") as HTMLDivElement;
const authedAddress = authedInfo?.querySelector(
  ".authed-info__address"
) as HTMLSpanElement;
const payMethod = authedInfo?.querySelector(".authed-info__pay");
const confirmBtn = authedInfo?.querySelector(".authed-info__confirm");

document.addEventListener("DOMContentLoaded", () => {
  const userData = getUserData();
  if (userData) {
    authBtns?.classList.toggle("hidden");
    authedInfo?.classList.toggle("hidden");
    if (authedInfo) {
      authedAddress.textContent = `${userData.city}, ${userData.street}, ${userData.houseNumber}`;
    }
    if (payMethod) {
      payMethod.textContent = userData.paymentMethod;
    }
    confirmBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      const cart = getLocalCart();
      if (cart.length === 0) {
        alert("Your cart is empty");
        return;
      }
      confirmOrder();
    });
  } else {
    authBtns?.classList.toggle("hidden");
    authedInfo?.classList.toggle("hidden");
  }
});

export function generateCartList(cartItems: CartItemLocal[]) {
  if (cartList) {
    cartList.innerHTML = "";
  }
  for (const cartItem of cartItems) {
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const deleteBtn = clone.querySelector(
      ".item__delete-btn"
    ) as HTMLButtonElement;
    const quantity = clone.querySelector(".item__quantity") as HTMLSpanElement;
    const title = clone.querySelector(".item__title") as HTMLHeadingElement;
    const info = clone.querySelector(".item__info") as HTMLSpanElement;
    const currentPrice = clone.querySelector(
      ".item__price--cur"
    ) as HTMLSpanElement;
    const img = clone.querySelector(".item__img") as HTMLImageElement;

    if (cartItem.quantity > 1) {
      quantity.textContent = `${cartItem.quantity} units`;
    }

    deleteBtn.addEventListener("click", () => {
      removeFromCart(cartItem);
      const updatedCart = getLocalCart();
      generateCartList(updatedCart);
      updateCartInHeader();
      if (cartTotalPrice) {
        cartTotalPrice.textContent = `$${calcTotalPrice(updatedCart)}`;
      }
    });

    title.textContent = cartItem.name;
    let infoText = cartItem.size.size;
    if (cartItem.additives.length > 0) {
      infoText += `, ${cartItem.additives.join(", ")}`;
    }
    info.textContent = infoText;
    currentPrice.textContent = `$${cartItem.totalItemPrice.toFixed(2)}`;
    img.src = `img/cards/${cartItem.name}.jpg`;
    img.alt = `${cartItem.name} image`;
    cartList?.append(clone);
  }
}

const localCart = getLocalCart();
generateCartList(localCart);

if (cartTotalPrice) {
  cartTotalPrice.textContent = `$${calcTotalPrice(localCart)}`;
}
