const confirmation = document.querySelector(".button_submit")


let loggedInUser=""
document.addEventListener('DOMContentLoaded', () => {
     loggedInUser = JSON.parse(localStorage.loggedInUser)
       document.getElementById('firstName').value=loggedInUser.name;
    document.getElementById('lastName').value=loggedInUser.surname;
     document.getElementById('address').value=loggedInUser.shippingAddress;
})


confirmation.addEventListener('click',orderNow)

function orderNow(){
    let extractedCart = loggedInUser.cart
    let sellers = []
    //adding the items to list of purchased items
     extractedCart.map(element => {
        loggedInUser.listOfPurchasedItems.push(element)    
    });
    //calculating payment the buyer has to PAY
    let Payment = loggedInUser.cart.reduce((acc, item) => acc + (item.price * item.selectedQuantity), 0) + 20
   
    let users = JSON.parse(localStorage.users)
    
    const foundUser = users.find(user=>user.username==2);
    const foundLoggedInUser = users.find(user => user.username==loggedInUser.username)

    //Deducting the payment amount from buyer's account 
    foundLoggedInUser.bankAccount.amount-=Payment

    //Adding the payment amount to seller's account
    foundUser.bankAccount.amount+=Payment
   // above is done so that bank information persists

    //Adding the items bought by the buyer in the list of sold items for seller
    extractedCart.map(element => {foundUser.listOfSoldItems.push(element)});

    //Adding the items bought by the buyer in the list of sold items for seller
    extractedCart.map(item => {foundLoggedInUser.listOfPurchasedItems.push(item)})

   //Deducting the payment amount from logged in buyer's account
   loggedInUser.bankAccount.amount-=Payment

   //removing items from the cart
   let emtpyArray = []
   loggedInUser.cart = emtpyArray

   //saving the data
   localStorage.loggedInUser = JSON.stringify(loggedInUser)
   localStorage.users = JSON.stringify(users)
   window.alert("Transaction successful")
   window.location.href = "../seller_portfolio/index.html";
}