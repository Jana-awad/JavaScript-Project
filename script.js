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

const orderedItems ={}

const left = document.querySelector(".left");
const purchaseList = document.querySelector(".purchase-list")
const itemsCount = document.querySelector("#items-count")
const totalEl = document.querySelector("#total")

function renderItems(list) {
  left.innerHTML = "";
  list.forEach((item,index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <span class="card-icon" id=${index}>${item.image}</span>
      <h3>${item.productName}</h3>
      <p class="type">${item.type}</p>
      <p class="price">$${item.price.toFixed(2)}</p>
    `;
    left.appendChild(card);

    card.addEventListener("click",()=>{
        addItems(index)
        populateCart()
    })

  });
}

function populateCart(){
  purchaseList.innerHTML = ""
  Object.entries(orderedItems).forEach(([index,qty])=>{
    const item = items[index]
    if(qty === 0) return;
    const li = document.createElement('li')
    li.classList.add("purchase-item")
    li.innerHTML = `
      <div class="item-info">
        <p class="item-name">${item.productName}</p>
        <p class="item-price">$${item.price.toFixed(2)} each</p>
      </div>
      <div class="item-qty">
        <button class="minus-btn"><i class="fa-solid fa-minus"></i></button>
        <span>${qty}</span>
        <button class="add-btn"><i class="fa-solid fa-plus"></i></button>
      </div>
      <p class="item-total">$${(item.price * qty).toFixed(2)}</p>
      <button class="remove-btn"><i class="fa-regular fa-trash-can"></i></button>
    `

    li.querySelector(".minus-btn").addEventListener("click", () => {
      subtractItem(index)
      populateCart()
    })

    li.querySelector(".add-btn").addEventListener("click", () => {
      addItems(index)
      populateCart()
    })
    
    li.querySelector(".remove-btn").addEventListener("click", () => {
      deleteListing(index)
      populateCart()
    })
    
    purchaseList.appendChild(li)
  })

  renderSummary()
}

function getItemCount(){
  return Object.values(orderedItems).reduce((sum, qty) => sum + qty, 0)
}

function getTotal(){
  return Object.entries(orderedItems).reduce((sum, [index, qty]) => sum + items[index].price * qty, 0)
}

function renderSummary(){
  itemsCount.textContent = getItemCount()
  totalEl.textContent = `$${getTotal().toFixed(2)}`
}

renderItems(items);
renderSummary();


function addItems(index){
    if(Object.hasOwn(orderedItems,index)){
        orderedItems[index] = orderedItems[index] + 1
    }else{
        orderedItems[index] = 1
    }
}

function subtractItem(index){
    if(!Object.hasOwn(orderedItems,index)) return
    orderedItems[index] = orderedItems[index] - 1
    if(orderedItems[index] === 0){
        deleteListing(index)
    }
}

function deleteListing(index){
    delete orderedItems[index]
}
