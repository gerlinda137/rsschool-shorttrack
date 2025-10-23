import { Product, SingleProduct, Sizes } from "./interfaces";
import { getAllProducts, getSingleProduct } from "./api";

let jsonData: Product[] = [];
const loader = document.querySelector(".loader") as HTMLDivElement;
const cardsList = document.querySelector(".cards") as HTMLElement;
const template = document.getElementById(
  "card-template"
) as HTMLTemplateElement;
const moreCardsBtn = document.querySelector(".cards__btn") as HTMLElement;
const tabs = document.querySelectorAll<HTMLElement>(".tabs__button");
const root = document.querySelector("body") as HTMLElement;

async function initialCardsLoad() {
  try {
    loader.classList.remove("hidden");
    const ProductsData = await getAllProducts();
    jsonData = ProductsData.data;
    loader.classList.add("hidden");
    console.log(jsonData);
    processData();
  } catch (error) {
    console.log(error);
  }
}

function processData(category: string = "coffee") {
  const products: Product[] = [];

  moreCardsBtn.classList.remove("hidden");

  for (const iterator of jsonData) {
    if (iterator.category == category) {
      products.push(iterator);
    }
  }

  for (const product of products) {
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const cardTitle = clone.querySelector(".card__title") as HTMLHeadingElement;
    const cardDescription = clone.querySelector(
      ".card__description"
    ) as HTMLParagraphElement;
    const cardPriceOld = clone.querySelector(
      ".card__price--old"
    ) as HTMLSpanElement;
    const cardPriceCurrent = clone.querySelector(
      ".card__price--current"
    ) as HTMLSpanElement;
    const cardImg = clone.querySelector(".card__img") as HTMLImageElement;
    const card = clone.querySelector(".card") as HTMLDivElement;
    card.id = product.id;

    if (cardTitle) cardTitle.textContent = product.name;
    if (cardDescription) cardDescription.textContent = product.description;
    if (cardPriceOld && product.discountPrice) {
      cardPriceCurrent.textContent = `$${product.discountPrice}`;
      cardPriceOld.textContent = `$${product.price}`;
    } else {
      cardPriceCurrent.textContent = `$${product.price}`;
      cardPriceOld.remove();
    }
    if (cardImg) {
      cardImg.src = `img/cards/${product.name}.jpg`;
      cardImg.alt = `${product.name} image`;
    }
    if (card) {
      card.addEventListener("click", () => generatePopupWithData(product.id));
    }

    cardsList.appendChild(clone);
  }

  if (products.length <= 4) {
    moreCardsBtn.classList.add("hidden");
  }
}

for (const tab of tabs) {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => {
      tab.classList.remove("tabs__button--active");
    });
    tab.classList.add("tabs__button--active");
    const tabId = tab.id;
    const tabCategory = tabId.substring(4);
    const oldCards = document.querySelectorAll(".card");
    for (const card of oldCards) {
      card.remove();
    }
    processData(tabCategory);
  });
}

moreCardsBtn.onclick = () => {
  const cards = document.querySelectorAll(".card");

  for (const card of cards) {
    card.classList.add("show-all");
  }
  moreCardsBtn.classList.add("hidden");
};

//popup

const popUpTemplate = document.querySelector(
  ".popup-template"
) as HTMLTemplateElement;

async function generatePopupWithData(id: string) {
  try {
    loader.classList.remove("hidden");
    const productData = await getSingleProduct(id);
    const productJsonData = productData.data as SingleProduct;
    generatePopup(productJsonData);
    loader.classList.add("hidden");
    console.log(productJsonData);
  } catch (error) {
    console.log(error);
  }
}

function generatePopup(productData: SingleProduct): void {
  const popupClone = popUpTemplate.content.cloneNode(true) as DocumentFragment;
  const popupTitle = popupClone.querySelector(
    ".popup__title"
  ) as HTMLHeadingElement;
  const popupDescription = popupClone.querySelector(
    ".popup__description"
  ) as HTMLParagraphElement;
  const totalPriceCurrent = popupClone.querySelector(
    ".total__price--current"
  ) as HTMLSpanElement;
  const totalPriceOld = popupClone.querySelector(
    ".total__price--old"
  ) as HTMLSpanElement;
  const popupImg = popupClone.querySelector(
    ".popup__img img"
  ) as HTMLImageElement;

  if (popupTitle) popupTitle.textContent = productData.name;
  if (popupDescription) popupDescription.textContent = productData.description;
  if (totalPriceCurrent && productData.discountPrice) {
    totalPriceCurrent.textContent = `$${productData.discountPrice}`;
    totalPriceOld.textContent = `$${productData.price}`;
  } else {
    totalPriceCurrent.textContent = `$${productData.price}`;
    totalPriceOld.remove();
  }
  if (popupImg) {
    popupImg.src = `img/cards/${productData.name}.jpg`;
    popupImg.alt = `${productData.name} image`;
  }

  const btnsSizeContainer = popupClone.querySelector(
    ".popup__btns--size"
  ) as HTMLDivElement;
  const btnsSize = btnsSizeContainer.querySelectorAll<HTMLElement>(".checkbox");

  for (let i = 0; i < btnsSize.length; i++) {
    const button = btnsSize[i];
    const buttonLabel = button.querySelector(
      ".checkbox__label"
    ) as HTMLLabelElement;
    const buttonInput = button.querySelector("input") as HTMLInputElement;
    if (buttonLabel && buttonInput) {
      const inputId = buttonInput.id as keyof Sizes;
      if (productData.sizes[inputId]) {
        buttonLabel.textContent = productData.sizes[inputId].size;
      }
    }
  }

  const btnsAddContainer = popupClone.querySelector(
    ".popup__btns--additives"
  ) as HTMLDivElement;
  const btnsAdd =
    btnsAddContainer.querySelectorAll<HTMLDivElement>(".checkbox");

  for (let i = 0; i < btnsAdd.length; i++) {
    const button = btnsAdd[i];
    const buttonLabel = button.querySelector(
      ".checkbox__label"
    ) as HTMLLabelElement;
    const buttonInput = button.querySelector("input") as HTMLInputElement;
    if (buttonLabel && buttonInput) {
      const inputId = parseInt(buttonInput.id);
      if (productData.additives[inputId]) {
        buttonLabel.textContent = productData.additives[inputId].name;
      }
    }
  }

  root.classList.add("no-scroll");
  root.appendChild(popupClone);

  const popupAppended = document.querySelector(".popup") as HTMLDivElement;
  const popupInner = popupAppended.querySelector(
    ".popup__inner"
  ) as HTMLDivElement;
  const popupClose = popupAppended.querySelector(
    ".popup__close"
  ) as HTMLButtonElement;

  if (popupClose) {
    popupClose.addEventListener("click", () => {
      popupAppended.remove();
      root.classList.remove("no-scroll");
    });
  }

  document.addEventListener("click", (e: MouseEvent) => {
    if (popupAppended && e.target !== popupInner && e.target == popupAppended) {
      popupAppended.remove();
      root.classList.remove("no-scroll");
    }
  });

  calcPrice(productData);
}

//popup math

function calcPrice(productData: SingleProduct) {
  let price = +productData.price;
  const checkboxes = document.querySelectorAll(".checkbox input");

  for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", () => {
      price = +productData.price;
      checkSize();
      checkAdds();
      let roundedPrice = price.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
      const totalPrice = document.querySelector(".total__price") as HTMLElement;
      if (totalPrice) {
        totalPrice.textContent = `$${roundedPrice}`;
      }
    });
  }

  const sizeList = document.querySelector(
    ".popup__btns--size"
  ) as HTMLDivElement;
  const sizes = sizeList.querySelectorAll<HTMLInputElement>("input");

  const addList = document.querySelector(
    ".popup__btns--additives"
  ) as HTMLDivElement;
  const adds = addList.querySelectorAll<HTMLInputElement>("input");

  function checkSize(): void {
    for (const size of sizes) {
      if (size.checked == true) {
        const sizeValue = size.id as keyof Sizes;

        price += Number(productData.sizes[sizeValue].price);
      }
    }
  }

  function checkAdds(): void {
    for (const add of adds) {
      if (add.checked == true) {
        const addValue = parseInt(add.id);
        price += Number(productData.additives[addValue].price);
      }
    }
  }
}

initialCardsLoad();
