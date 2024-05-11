 import { Item } from "../app/item.js";
// import * as itemsRepo from "../../app/phase_1_repo/ItemsRepo.js"
// import * as UsersRepo from "../../app/phase_1_repo/UsersRepo.js"

var newItem = null;

document.getElementById("Upload").addEventListener("submit", async function(event) {
    event.preventDefault();

    let itemName = document.getElementById("itemName").value;
    let price = parseFloat(document.getElementById("price").value);
    let quantity = parseInt(document.getElementById("quantity").value);
    let category = document.querySelector('input[name="category"]:checked').value;
    let picture = document.getElementById("picture").files[0]; 
    

    if (!itemName || isNaN(price) || isNaN(quantity) || !picture ) {
        showMessage("Please fill in all fields.");
        return;
    }

    if (!picture.type.startsWith('image/')) {
        showMessage("Please upload an image file.");
        return;
    }

    let loggedInUser = JSON.parse(localStorage.loggedInUser);

    if (!loggedInUser) {
        // showMessage("Please log in to upload items.");
        window.alert("Pleae log in to continue")
        return;
    }

    // to read the image uploaded as a DataURL
    const reader = new FileReader();
    reader.readAsDataURL(picture);

    let sellerId = loggedInUser.username;

reader.addEventListener("load", async () => {
        // convert image file to base64 string
        newItem = new Item(sellerId, itemName, price, "", quantity, reader.result, category);
        
        //let result = await itemsRepo.uploadItem(newItem);
        let result1 = await uploadItemRpo(newItem);
        showMessage(result1);
        document.getElementById("Upload").reset();
        });
    

    
  });
  
  function showMessage(message) {
    document.getElementById("message").textContent = message;
  }

 async function uploadItemRpo(newItem) {
    let users = JSON.parse(localStorage.users);
    let loggedInUser = JSON.parse(localStorage.loggedInUser);
    let allItems = JSON.parse(localStorage.itemList)
    if (!loggedInUser) {
      alert("No user logged in.");
      return;
    }
    let currentItemList = loggedInUser.listOfCurrentItems;
    console.log(currentItemList);

    allItems.push(newItem);

    loggedInUser.listOfCurrentItems.push(newItem);
    const foundUsers = users.find(
      (user) => user.username == loggedInUser.username
    );
    foundUsers.listOfCurrentItems.push(newItem);
  
    localStorage.users = JSON.stringify(users);
    localStorage.loggedInUser = JSON.stringify(loggedInUser);
    localStorage.itemList=JSON. stringify(allItems)

   const retrievedData = localStorage.users;
   const parsedData = JSON.parse(retrievedData);

   const retrievedData2 = localStorage.itemList;
   const parsedData2 = JSON.parse(retrievedData2);

    alert("Item uploaded successfully.");

    const url = 'http://localhost:3000/api/phase_1/users'
    const response = await fetch(url, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(parsedData)
 
             })
    const url2 = 'http://localhost:3000/api/phase_1/items'
    const response2 = await fetch(url2, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(parsedData2)
 
             })         
    return "Item uploaded successfully.";     
  }