fetch("product.json")
  .then((response) => response.json())
  .then(function (data) {
    jsonData = data;
    processData();
  })
  .catch((error) => console.error("Error:", error));

let jsonData = [];
const cardsList = document.querySelector(".cards");
const template = document.getElementById("card-template");

function processData(category = "coffee") {
  console.log(jsonData);
  const products = [];

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
}

const tabs = document.querySelectorAll(".tabs__button");
console.log(tabs);

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
