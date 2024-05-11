// import * as itemsRepo from "../../app/phase_1_repo/ItemsRepo.js"
// import * as UsersRepo from "../../app/phase_1_repo/UsersRepo.js"

const loggedInUser = await localStorage.loggedInUser
const loggedUserObj = JSON.parse(loggedInUser)

const allitems = await localStorage.itemList
const items = JSON.parse(allitems) 

document.getElementById("currently-selling-items").style.display = "block";
displayCurrentUsersItems()

document.getElementById("current-items-button").addEventListener("click", displayCurrentUsersItems)
document.getElementById("purchase-history-button").addEventListener("click", displayPurchaseHistory)
document.getElementById("sale-history-button").addEventListener("click", displayUsersSaleHistory)

document.querySelector(".below-header-div").innerHTML =
                `<h1>Hi ${loggedUserObj.name}&#x1F44B;</h1>`


function currentItemCardTemplate(item) {
        return `<article class="card">
                <p hidden id="${item.id}"></p>
                <img src="${item.picture}" alt="Item"><br>
                <p><b>Name: </b>${item.name}</p><br>
                <p><b>Price: </b>${item.price} QAR</p> <br>
                <p><b>Quantity: </b>${item.quantity}</p> <br>
                <p><b>category: </b>${item.category}</p><br>
                <a class="popup-btn">Update</a>
        </article>`;
}
    
function soldItemCardTemplate({name, selectedQuantity, category, picture,boughtByUser="Ali",price}) {
        
        return `<article class="card">
                <img src="${picture}" alt="Item"><br>
                <p><b>Name: </b>${name}</p><br>
                <p><b>Quantity: </b>${selectedQuantity}</p> <br>
                <p><b>category: </b>${category}</p><br>
                <p><b>Bought by User: </b>${boughtByUser}</p><br>
                <p><b>Selling Price: </b>${price} QAR</p><br>
        </article>`;
}

function displayCurrentUsersItems() {
        var i;
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
        }
        document.getElementById("currently-selling-items").style.display = "block";
        document.querySelector("#currently-selling-items > .items-list").innerHTML = 
                loggedUserObj.listOfCurrentItems
                        .map(item => currentItemCardTemplate(item)).join(" ")
        
        document.querySelectorAll(".popup-btn").forEach(c => c.addEventListener("click", (event) => {
                const itemId = event.target.parentElement.querySelector("*").id
                
                const item =  searchItem(itemId)
                
                const dialog = document.getElementById("item-popup-dialog");
                document.getElementById("dialog-content").innerHTML = 
                        `<h1 style="color:grey">Update Quantity for: <p style="color:black">${item.name}</p></h1>`
                document.querySelector("dialog form").innerHTML = 
                        `<label for="quantity">Quantity: </label>
                        <input type="number" name="quantity" id="quantity" placeholder="Enter Quantity Here">
                        <label for="price">Price: </label>
                        <input type="number" name="price" id="price" placeholder="Enter Price Here">
                        <button>Close</button>
                        <button type="submit" id="update-submit-button">Submit</button>`
                document.getElementById('quantity').value=item.quantity;
                document.getElementById('price').value=item.price;

                dialog.showModal();
                console.log("done");
                document.getElementById("update-submit-button").addEventListener("click", () => {

                        const form = document.getElementById("update-item-form")
                        const formData = new FormData(form);
                        item.price = formData.get("price")
                        item.quantity = formData.get("quantity")
                        
                        updateItem(item)
                        window.location.reload()
                })
        }))

        


}

function displayPurchaseHistory() {
        var i;
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
        }
        document.getElementById("purchase-history").style.display = "block";
        document.querySelector("#purchase-history > .items-list").innerHTML = 
                loggedUserObj.listOfPurchasedItems
                        .map(item => soldItemCardTemplate(item)).join(" ")

}

async function displayUsersSaleHistory() {
        var i;
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
        }
        document.getElementById("sale-history").style.display = "block"
        const saleHistoryInfo = document.querySelector(".sale-history-info")
        saleHistoryInfo.innerHTML = `<h3><b>Number of Items Sold: </b>${loggedUserObj.listOfSoldItems.length}</h3>`

        document.querySelector("#sale-history > .items-list").innerHTML =
                loggedUserObj.listOfSoldItems
                        .map(item => soldItemCardTemplate(item)).join(" "); 

}

 function updateItem(item) {
        items.splice(items.findIndex(i => i.id == item.id), 1, item)
        localStorage.itemList = JSON.stringify(items)
        loggedUserObj.listOfCurrentItems
            .splice(loggedInUser.listOfCurrentItems.findIndex(i => i.id == item.id), 1, item)
        localStorage.loggedInUser = JSON.stringify(loggedInUser)
    }

 function searchItem(id) {
        return  items.find(i => i.id == id)
    }

