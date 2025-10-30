import { confirmOrderApi } from "./api";
import { getLocalCart, updateCartInHeader } from "./cart";
import { calcTotalPrice } from "./calcTotalPrice";
import { CartItemLocal } from "./interfaces";
import { insertLoader } from "./loader";

export async function confirmOrder(): Promise<void> {
  const cart: CartItemLocal[] = getLocalCart();
  const cartContainer = document.querySelector(".cart") as HTMLDivElement;
  const cartItemsContainer = document.querySelector(".cart-items");
  const confirmBtn = document.querySelector(".authed-info__confirm");
  const totalPriceSpan = document.querySelector(
    ".cart-total__price"
  ) as HTMLSpanElement;

  const orderData = {
    items: cart.map((item) => ({
      productId: +item.productId,
      size: item.size.size.includes("ml")
        ? item.size.size.replace(" ml", "")
        : item.size.size.replace(" g", ""),
      additives: item.additives,
      quantity: item.quantity,
    })),
    totalPrice: +calcTotalPrice(cart),
  };

  try {
    let loader: HTMLDivElement | null = null;
    const root = document.querySelector("body");
    if (cartContainer) {
      loader = insertLoader(cartContainer);
    }

    const isSuccess = await confirmOrderApi(orderData);
    if (isSuccess) {
      setTimeout(() => {
        if (loader) {
          loader.remove();
        }
        const popupMessage = document.createElement("p");
        popupMessage.className = "popup-success";
        popupMessage.textContent =
          "Thank you for your order! Our manager will contact you shortly.";
        if (root) {
          root.append(popupMessage);
        }
        localStorage.removeItem("cart");
        updateCartInHeader();
        setTimeout(() => {
          popupMessage.remove();
        }, 1500);
      }, 1000);
      if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";
      }
      if (totalPriceSpan) {
        totalPriceSpan.textContent = "$0.00";
      }

      confirmBtn?.classList.add("hidden");
    } else {
      throw new Error("Order confirmation failed");
    }
  } catch (error) {
    const root = document.querySelector("body");
    const loader = document.querySelector(".loader");
    console.log(error);
    setTimeout(() => {
      if (loader) {
        loader.remove();
      }
      const popupMessage = document.createElement("p");
      popupMessage.className = "popup-error";
      popupMessage.textContent = "Something went wrong. Please, try again";
      if (root) {
        root.append(popupMessage);
      }
      setTimeout(() => {
        popupMessage.remove();
      }, 1500);
    }, 1000);
  }
}
