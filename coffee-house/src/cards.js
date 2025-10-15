let jsonData = [];
const cardsList = document.querySelector(".cards");
const template = document.getElementById("card-template");
const moreCardsBtn = document.querySelector(".cards__btn");
const tabs = document.querySelectorAll(".tabs__button");
const root = document.querySelector("body");

fetch("product.json")
  .then((response) => response.json())
  .then(function (data) {
    jsonData = data;
    processData();
  })
  .catch((error) => console.error("Error:", error));

function processData(category = "coffee") {
  const products = [];

  moreCardsBtn.classList.remove("hidden");

  for (const iterator of jsonData) {
    if (iterator.category == category) {
      products.push(iterator);
    }
  }

  for (const product of products) {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".card__title").textContent = product.name;
    clone.querySelector(".card__description").textContent = product.description;
    clone.querySelector(".card__price").textContent = `$${product.price}`;
    clone.querySelector(".card__img").src = `img/cards/${product.name}.jpg`;
    clone.querySelector(".card__img").alt = `${product.name} image`;
    clone
      .querySelector(".card")
      .addEventListener("click", () => generatePopup(product));
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
const popUpTemplate = document.querySelector(".popup-template");

function generatePopup(cardData) {
  const popupClone = popUpTemplate.content.cloneNode(true);
  popupClone.querySelector(".popup__title").textContent = cardData.name;
  popupClone.querySelector(".popup__description").textContent =
    cardData.description;
  popupClone.querySelector(".total__price").textContent = `$${cardData.price}`;
  popupClone.querySelector(
    ".popup__img img"
  ).src = `img/cards/${cardData.name}.jpg`;
  popupClone.querySelector(".popup__img img").alt = `${cardData.name} image`;

  const btnsSizeContainer = popupClone.querySelector(".popup__btns--size");
  const btnsSize = btnsSizeContainer.querySelectorAll(".checkbox");

  for (let i = 0; i < btnsSize.length; i++) {
    const button = btnsSize[i];
    const buttonLabel = button.querySelector(".checkbox__label");
    const buttonInput = button.querySelector("input");
    const inputId = buttonInput.id;
    buttonLabel.textContent = cardData.sizes[inputId]["size"];
  }

  const btnsAddContainer = popupClone.querySelector(".popup__btns--additives");
  const btnsAdd = btnsAddContainer.querySelectorAll(".checkbox");

  for (let i = 0; i < btnsAdd.length; i++) {
    const button = btnsAdd[i];
    const buttonLabel = button.querySelector(".checkbox__label");
    const buttonInput = button.querySelector("input");
    const inputId = buttonInput.id;
    buttonLabel.textContent = cardData.additives[inputId]["name"];
  }

  root.classList.add("no-scroll");
  root.appendChild(popupClone);

  const popupAppended = document.querySelector(".popup");
  const popupInner = popupAppended.querySelector(".popup__inner");
  popupAppended.querySelector(".popup__close").addEventListener("click", () => {
    popupAppended.remove();
    root.classList.remove("no-scroll");
  });
  document.addEventListener("click", (e) => {
    if (popupAppended && e.target !== popupInner && e.target == popupAppended) {
      popupAppended.remove();
      root.classList.remove("no-scroll");
    }
  });

  calcPrice(cardData);
}

//popup math

function calcPrice(cardData) {
  let price = +cardData.price;
  const checkboxes = document.querySelectorAll(".checkbox input");

  for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", () => {
      price = +cardData.price;
      checkSize();
      checkAdds();
      let roundedPrice = price.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
      document.querySelector(".total__price").textContent = `$${roundedPrice}`;
    });
  }

  const sizeList = document.querySelector(".popup__btns--size");
  const sizes = sizeList.querySelectorAll("input");

  const addList = document.querySelector(".popup__btns--additives");
  const adds = addList.querySelectorAll("input");

  function checkSize() {
    for (const size of sizes) {
      if (size.checked == true) {
        const sizeValue = size.id;

        price += Number(cardData.sizes[sizeValue]["add-price"]);
      }
    }
  }

  function checkAdds() {
    for (const add of adds) {
      if (add.checked == true) {
        const addValue = add.id;
        price += Number(cardData.additives[addValue]["add-price"]);
      }
    }
  }
}
