
let user = []
const slider = document.querySelector('#main')
const computer = document.querySelector("#comp-pic")
const mobile = document.querySelector("#mob-pic")
const acc = document.querySelector("#acc-pic")
const categories = document.querySelector('.categories')
const items = document.querySelector("#item-list")
const hr = document.querySelector(".heading")
const cart = document.getElementById(".add-btn")
const goBtn = document.querySelector("#goBtn")
const searchBar = document.querySelector("#searchBar")

let itemList = []

document.addEventListener("DOMContentLoaded", async () => {
  const url = '/api/phase_1/items'
  const response = await fetch(url)
  const data = await response.json();
  itemList= data
  localStorage.itemList = JSON.stringify(itemList)
});

computer.addEventListener('click', showComp)
mobile.addEventListener('click', showMobile)
acc.addEventListener('click', showAcc)
goBtn.addEventListener('click', searchItems)

async function showComp() {
  hide()
  itemList = JSON.parse(localStorage.itemList)
  let computer = ""
  computer = itemList.filter(p => p.category == "laptop")
  console.log(computer);
  items.innerHTML = computer.map(item => getItems(item)).join("");
  scrollToTop()
}

async function showMobile() {
  hide()
  let mobile = ""
  itemList = JSON.parse(localStorage.itemList)
  mobile = itemList.filter(p => p.category == "mobile")
  items.innerHTML = mobile.map(item => getItems(item)).join("");
  scrollToTop()
}

async function showAcc() {
  hide()
  let acc = ""
  itemList = JSON.parse(localStorage.itemList)
  acc = itemList.filter(p => p.category == "accessories")
  items.innerHTML = acc.map(item => getItems(item)).join("");
  localStorage.itemList = JSON.stringify(itemList)
  scrollToTop()
}

async function hide(){
  slider.style.display = 'none'
  categories.style.display = 'none'
  hr.style.display = 'none'
}

async function scrollToTop(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

async function addToCart(id) {

  let loggedInUser = localStorage.loggedInUser
  let users = ""
  if (loggedInUser) {
    loggedInUser = JSON.parse(localStorage.loggedInUser)
    itemList = JSON.parse(localStorage.itemList)
    const item = itemList.find(i => i.id == id)
    loggedInUser.cart.push(item)
    localStorage.loggedInUser = JSON.stringify(loggedInUser)
    window.alert(item.name + " is added to your cart!");

  } else {
    //const url = 'app/api/phase_1/items'
    // const data = await fetch('/app/phase_1_data/users.json')
    // users = await data.json()
    window.alert("Please log in to continue")
    window.location.href = "../login.html";
  }
 

}

function getItems(item) {
  return `
    <div class ="item-card">
    <img src="${item.picture}" id="item_Pic">
    <div>
    <p><b>Title:</b> ${item.name} </p>
    <p><b>Price:</b> ${item.price} QAR </p>
    <p><b>Quantity:</b> ${item.quantity} </p>
    </div>
    <div>
    <button class="add-btn" onclick="addToCart('${item.id}')">Add to Cart</button>
    </div>
    </div>
`
}

async function searchItems() {

  slider.style.display = 'none'
  categories.style.display = 'none'
  hr.style.display = 'none'

  itemList = localStorage.itemList
  if (itemList) {
    itemList = JSON.parse(localStorage.itemList)
  }
  else {
    const url = 'app/api/phase_1/items'
    const data = await fetch(url)
    itemList =  data

  }
  localStorage.itemList = JSON.stringify(itemList)
  const filteredItems = itemList.filter((item) => ItemFinder(item, searchBar.value));
  console.log(itemList);
  console.log(filteredItems)
  items.innerHTML = filteredItems.map(item => getItems(item)).join("");
}

function ItemFinder(item, text) {
  const newText = text.toLowerCase().trim();
  if (item.name.toLowerCase().includes(newText)) {
    return item;
  }
}