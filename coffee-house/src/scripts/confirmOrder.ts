import { confirmOrderApi } from "./api";
import { getLocalCart, updateCartInHeader } from "./cart";
import { calcTotalPrice } from "./calcTotalPrice";
import { CartItemLocal } from "./interfaces";

export async function confirmOrder(): Promise<void> {
  // 1. Получаем корзину из localStorage
  const cart: CartItemLocal[] = getLocalCart();

  // 2. Преобразуем данные для API
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

  // 3. Отправляем запрос через API функцию
  const isSuccess = await confirmOrderApi(orderData);

  if (isSuccess) {
    console.log("Order confirmed successfully!");
    // Очищаем корзину после успешного заказа
    localStorage.removeItem("cart");
    updateCartInHeader();
  } else {
    console.error("Order confirmation failed");
  }
}
