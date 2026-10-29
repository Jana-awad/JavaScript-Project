import Item from "./itemClass.js";

const items = [
  new Item("🍎", "Apples (1kg)", "Produce", 3.5),
  new Item("🍌", "Bananas", "Produce", 2.2),
  new Item("🥛", "Milk 1L", "Dairy", 1.8),
  new Item("🧀", "Cheese", "Dairy", 6.9),
  new Item("🍞", "Bread", "Bakery", 2.5),
  new Item("🥐", "Croissant", "Bakery", 1.6),
  new Item("☕", "Coffee", "Drinks", 9.99),
  new Item("🧃", "Orange Juice", "Drinks", 4.25),
  new Item("☕", "jana", "Drinks", 9.99),
];



const left = document.querySelector(".left");

function renderItems(list) {
  left.innerHTML = "";
  list.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <span class="card-icon">${item.image}</span>
      <h3>${item.productName}</h3>
      <p class="type">${item.type}</p>
      <p class="price">$${item.price.toFixed(2)}</p>
    `;
    left.appendChild(card);
  });
}

renderItems(items);
