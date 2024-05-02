
let loggedInUser = []

document.addEventListener('DOMContentLoaded', () => {
    let order = document.querySelector('.order_summary')
    let cart = document.querySelector("#cart-id")
    let summary = document.querySelector(".summary")
    let amount = document.querySelector(".amount") 

    loggedInUser = JSON.parse(localStorage.loggedInUser)
    
    amount.innerHTML= loggedInUser.bankAccount.amount

    function updateLocalStorage() {
        localStorage.loggedInUser = JSON.stringify(loggedInUser);
    }

    //updating order summary
    function updateSummary(totalCost) {
        let shipping = 20;
        if(totalCost===0){
            summary.innerHTML ="" 
        }else{
            let payment = totalCost + shipping;
        summary.innerHTML = "<br>" + "Total: " + totalCost + " QAR" + "<br>" + "Shipping Charges: " + shipping + " QAR" + "<br>" + "Payment: " + payment + "<br>" + payBtn();
        }
        
    }
    //handling the quantity change. Everytime user selects a quantity it gets updated
    function handleQuantityChange(event, index) {
        let newQuantity = parseInt(event.target.value);
        loggedInUser.cart[index].selectedQuantity = newQuantity;
        updateLocalStorage();
        updateSummary(calculateTotalCost());
    }
    
    //adding the item to cart
    cart.innerHTML = loggedInUser.cart.map((item, index) => addToCart(item, index)).join("");
   
    //calculating total cost of items in the cart (without shipping charges)
    function calculateTotalCost() {
        return loggedInUser.cart.reduce((acc, item) => acc + (item.price * item.selectedQuantity), 0);
    }

    let quantityInputs = document.querySelectorAll("#quantity");
    quantityInputs.forEach((input, index) => {
        input.value = loggedInUser.cart[index].selectedQuantity; // Set the selected value
        input.addEventListener("change", (event) => {
            handleQuantityChange(event, index);
        });
        });

        updateSummary(calculateTotalCost());
        
 })


function addToCart(item){
    return `
    <div class ="item-card" id="id-${item.id}">
    <img class="item_img" src="${item.picture}">
    <div>
    <p><b>Title:</b> ${item.name} </p>
    <p><b>Price:</b> ${item.price} QAR </p>
    </div>
    <div>
    <label for="quantity">Quantity</label>
    <select id="quantity" name="Quantity">
    <option value=""></option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    </select>
    <button  class="add-btn"  onclick="removeItem('${item.id}')"><span>&minus;</span></button>
    </div>
    </div>
` 
}

function handlePayment(){
    let cart = document.querySelector("#cart-id")
   let user = JSON.parse(localStorage.loggedInUser)
   let totalCost = loggedInUser.cart.reduce((acc, item) => acc + (item.price * item.selectedQuantity), 0);
   let shipping = 20;   
   let Payment =Number(totalCost)+Number(shipping)
   let  balance = user.bankAccount.amount
   if(balance>Payment){
    window.location.href = "confirmation.html";
   }else{
   window.alert("Low balance!")
   location.reload()
   }
   cart.innerHTML = user.cart.map(i => addToCart(i)).join("")
}

function payBtn(){
    return `
    <button  class="pay-btn" onclick="handlePayment()">Pay Now</span></button>
    `
}

function removeItem(id) {
    const item = document.getElementById(`id-${id}`)
    // order.style.display='none'
    item.remove()
    loggedInUser = localStorage.loggedInUser
    userList = JSON.parse(localStorage.loggedInUser)
    const index = userList.cart.findIndex(i=> i.id==id)
    userList.cart.splice(index,1);
    localStorage.loggedInUser = JSON.stringify(userList)
    location.reload()
}
