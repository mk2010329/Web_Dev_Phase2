
var usersList = []
var loggedInUser = {}

async function loadUsers(){
    let users = localStorage.users
    let userDataResponse = ""
    if(users){
        users = JSON.parse(localStorage.users)
    }
    else{
        userDataResponse = await fetch('/app/data/users.json');
        users = await userDataResponse.json();
    }
    
    return users
}

export async function findUser(username, password) {
    usersList = await loadUsers() 
   localStorage.users =  JSON.stringify(usersList)  
   let list = localStorage.users
    const foundUser = usersList.find((user)=>user.username==username && user.password==password);
    if(foundUser === undefined){
        return undefined;
    }else{
        console.log(foundUser);
        loggedInUser = foundUser
        return loggedInUser;
    }
}

export async function getLoggedInUser() {
    const users = await loadUsers()
    loggedInUser = localStorage.loggedInUser
    return JSON.parse(loggedInUser)
} 

export async function uploadItemRpo(newItem){
    let loggedInUser =await getLoggedInUser();
   let users = JSON.parse(localStorage.users)
    if (!loggedInUser) {
        alert("No user logged in.");
        return;
    }
    console.log(loggedInUser);
    let currentItemList = loggedInUser.listOfCurrentItems
    console.log(currentItemList);
   // currentItemList.push(newItem)
   // console.log(localStorage.listOfCurrentItems);
   // currentItemList.map(item=> loggedInUser.listOfCurrentItems.push(item))
    loggedInUser.listOfCurrentItems.push(newItem);
    const  foundUsers = users.find(user=>user.username==loggedInUser.username);
    foundUsers.listOfCurrentItems.push(newItem)

    localStorage.users = JSON.stringify(users);
    localStorage.loggedInUser =JSON.stringify(loggedInUser)
    alert("Item uploaded successfully.");
    return "Item uploaded successfully.";
}



