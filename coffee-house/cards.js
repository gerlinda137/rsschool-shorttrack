let jsonData = [];
const cardsList = document.querySelector(".cards");
const template = document.getElementById("card-template");
const moreCardsBtn = document.querySelector(".cards__btn");
const tabs = document.querySelectorAll(".tabs__button");

fetch("product.json")
  .then((response) => response.json())
  .then(function (data) {
    jsonData = data;
    processData();
  })
  .catch((error) => console.error("Error:", error));

function processData(category = "coffee") {
  console.log(jsonData);
  const products = [];

  moreCardsBtn.classList.remove("hidden");

  for (const iterator of jsonData) {
    if (iterator.category == category) {
      products.push(iterator);
    }
  }

  console.log(products);

  for (const product of products) {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".card__title").textContent = product.name;
    clone.querySelector(".card__description").textContent = product.description;
    clone.querySelector(".card__price").textContent = `$${product.price}`;
    clone.querySelector(".card__img").src = `img/cards/${product.name}.jpg`;
    clone.querySelector(".card__img").alt = `${product.name} image`;
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
