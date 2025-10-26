import { CartItemLocal, Product, SingleProduct, Sizes } from "./interfaces";
import { getAllProducts, getSingleProduct } from "./api";
import { addToCartLocal, updateCartInHeader } from "./cart";

let jsonData: Product[] = [];
const tabsContainer = document.querySelector(".tabs") as HTMLDivElement;
const cardsList = document.querySelector(".cards") as HTMLElement;
const template = document.getElementById(
  "card-template"
) as HTMLTemplateElement;
const moreCardsBtn = document.querySelector(".cards__btn") as HTMLElement;
const tabs = document.querySelectorAll<HTMLElement>(".tabs__button");
const root = document.querySelector("body") as HTMLElement;

export function insertLoader(container: HTMLElement): HTMLDivElement {
  const loader = document.createElement("div");
  loader.className = "loader";

  const spinner = document.createElement("div");
  spinner.className = "spinner";

  const text = document.createElement("p");
  text.textContent = "Loading products...";

  loader.appendChild(spinner);
  loader.appendChild(text);

  container.appendChild(loader);
  return loader;
}

async function initialCardsLoad() {
  let loader: HTMLDivElement | null = null;
  try {
    if (tabsContainer) {
      loader = insertLoader(tabsContainer);
    }
    const ProductsData = await getAllProducts();
    jsonData = ProductsData.data;
    if (loader) {
      loader.remove();
    }
    console.log(jsonData);
    processData();
  } catch (error) {
    if (loader) {
      loader.remove();
    }
    if (tabsContainer) {
      tabsContainer.innerHTML = `<p class="error-message">Something went wrong. Please, refresh the page</p>`;
    }
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

if (moreCardsBtn) {
  moreCardsBtn.onclick = () => {
    const cards = document.querySelectorAll(".card");

    for (const card of cards) {
      card.classList.add("show-all");
    }
    moreCardsBtn.classList.add("hidden");
  };
}

//popup

const popUpTemplate = document.querySelector(
  ".popup-template"
) as HTMLTemplateElement;

async function generatePopupWithData(id: string) {
  let loader: HTMLDivElement | null = null;
  try {
    if (root) {
      loader = insertLoader(root);
    }
    const productData = await getSingleProduct(id);
    const productJsonData = productData.data as SingleProduct;
    generatePopup(productJsonData);
    if (loader) {
      loader.remove();
    }
    console.log(productJsonData);
  } catch (error) {
    setTimeout(() => {
      if (loader) {
        loader.remove();
      }
      const popupError = document.createElement("p");
      popupError.className = "popup-error";
      popupError.textContent = "Something went wrong. Please, try again";
      if (root) {
        root.append(popupError);
      }
      setTimeout(() => {
        popupError.remove();
      }, 1500);
    }, 1000);

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
  const btnsSizeInputs = [] as HTMLInputElement[];

  btnsSizeContainer.innerHTML = "";

  for (const sizeKey in productData.sizes) {
    const size = productData.sizes[sizeKey as keyof Sizes];

    const li = document.createElement("li");
    li.className = "popup__btn-item";
    li.innerHTML = `
    <label class="checkbox">
      <input class="visually-hidden" type="radio" name="size" id="${sizeKey}" value="${sizeKey}">
      <span class="checkbox__custom-box">${sizeKey.toUpperCase()}</span>
      <span class="checkbox__label">${size.size}</span>
    </label>
  `;

    btnsSizeContainer.appendChild(li);
    btnsSizeInputs.push(li.querySelector("input")!);
  }
  btnsSizeInputs[0].checked = true;

  const btnsAddContainer = popupClone.querySelector(
    ".popup__btns--additives"
  ) as HTMLDivElement;
  const btnsAddsInputs = [] as HTMLInputElement[];

  btnsAddContainer.innerHTML = "";

  for (let i = 0; i < productData.additives.length; i++) {
    const additive = productData.additives[i];

    const li = document.createElement("li");
    li.className = "popup__btn-item";
    li.innerHTML = `
    <label class="checkbox">
      <input class="visually-hidden" type="checkbox" name="${additive.name.toLowerCase()}" id="${i}">
      <span class="checkbox__custom-box">${i + 1}</span>
      <span class="checkbox__label">${additive.name}</span>
    </label>
  `;

    btnsAddContainer.appendChild(li);
    btnsAddsInputs.push(li.querySelector("input")!);
  }

  root.classList.add("no-scroll");
  root.appendChild(popupClone);

  const popupAppended = document.querySelector(".popup") as HTMLDivElement;
  const popupInner = popupAppended.querySelector(
    ".popup__inner"
  ) as HTMLDivElement;
  const popupAddToCart = popupAppended.querySelector(
    ".popup__add-to-cart"
  ) as HTMLButtonElement;
  const closeBtn = popupAppended.querySelector(
    ".popup__close-btn"
  ) as HTMLButtonElement;

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popupAppended.remove();
      root.classList.remove("no-scroll");
    });
  }

  if (popupAddToCart) {
    popupAddToCart.addEventListener("click", () => {
      const selectedData = gatherSelectedOptions(
        productData,
        btnsSizeInputs,
        btnsAddsInputs
      );
      addToCartLocal(selectedData);
      updateCartInHeader();
      popupAddToCart.textContent = "✓ Added!";
      popupAddToCart.style.backgroundColor = "#4da750b3";
      setTimeout(() => {
        popupAppended.remove();
        root.classList.remove("no-scroll");
      }, 500);
    });
  }

  document.addEventListener("click", (e: MouseEvent) => {
    if (popupAppended && e.target !== popupInner && e.target == popupAppended) {
      popupAppended.remove();
      root.classList.remove("no-scroll");
    }
  });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (popupAppended && e.key === "Escape") {
      popupAppended.remove();
      root.classList.remove("no-scroll");
    }
  });
  calcPrice(productData);
}

//popup math

function calcPrice(productData: SingleProduct) {
  let price = 0;
  const checkboxes = document.querySelectorAll(".checkbox input");
  const sizeList = document.querySelector(
    ".popup__btns--size"
  ) as HTMLDivElement;
  const sizes = sizeList.querySelectorAll<HTMLInputElement>("input");

  for (const size of sizes) {
    if (size.checked === true) {
      const sizeValue = size.id as keyof Sizes;
      price = Number(productData.sizes[sizeValue].price);
      break;
    }
  }

  const addList = document.querySelector(
    ".popup__btns--additives"
  ) as HTMLDivElement;
  const adds = addList.querySelectorAll<HTMLInputElement>("input");

  for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", () => {
      price = 0;
      checkSize();
      checkAdds();
      let roundedPrice = price.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
      const totalPrice = document.querySelector(
        ".total__price--current"
      ) as HTMLElement;
      if (totalPrice) {
        totalPrice.textContent = `$${roundedPrice}`;
      }
    });
  }

  function checkSize(): void {
    for (const size of sizes) {
      if (size.checked == true) {
        const sizeValue = size.id as keyof Sizes;
        price = Number(productData.sizes[sizeValue].price);
        break;
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

function getSelectedSize(sizes: HTMLInputElement[]): string | null {
  for (const size of sizes) {
    if (size.checked) {
      return size.id;
    }
  }
  return null;
}

function getSelectedAdditives(
  adds: HTMLInputElement[]
): { id: string; name: string }[] {
  const selectedAdditives: { id: string; name: string }[] = [];
  for (const add of adds) {
    if (add.checked) {
      selectedAdditives.push({ id: add.id, name: add.name });
    }
  }
  return selectedAdditives;
}

function calculateTotalPrice(
  productData: SingleProduct,
  selectedSize: string | null,
  selectedAdditives: { id: string; name: string }[]
): number {
  let price = 0;

  if (selectedSize) {
    price += Number(productData.sizes[selectedSize as keyof Sizes].price);
  }

  for (const additiveId of selectedAdditives) {
    const index = parseInt(additiveId.id);
    price += Number(productData.additives[index].price);
  }

  return price;
}

function getSelectedAdditivesList(
  selectedAdds: { id: string; name: string }[]
) {
  const selectedAddsList = [];
  for (const add of selectedAdds) {
    selectedAddsList.push(add.name);
  }
  return selectedAddsList;
}

function gatherSelectedOptions(
  productData: SingleProduct,
  sizes: HTMLInputElement[],
  adds: HTMLInputElement[]
): CartItemLocal {
  const selectedSizeId = getSelectedSize(sizes);
  const selectedSizeObj = selectedSizeId
    ? productData.sizes[selectedSizeId as keyof Sizes]
    : productData.sizes.s;
  const selectedAdditives = getSelectedAdditives(adds);
  const totalPrice = calculateTotalPrice(
    productData,
    selectedSizeId,
    selectedAdditives
  );
  const selectedAdditivesList = getSelectedAdditivesList(selectedAdditives);
  return {
    productId: productData.id,
    name: productData.name,
    size: selectedSizeObj,
    additives: selectedAdditivesList,
    quantity: 1,
    price: totalPrice,
    totalItemPrice: totalPrice,
  };
}

initialCardsLoad();
