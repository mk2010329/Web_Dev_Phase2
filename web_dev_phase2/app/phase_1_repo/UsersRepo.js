import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

var usersList = [];
var loggedInUser = {};


class UsersRepo{
  constructor() {
    this.filePath = path.join(process.cwd(), '/app/phase_1_data/users.json')
}
 async getUsers(){
  const data = await fs.readJSON(this.filePath)
  return data
 }

 async findUser(username,password){
  usersList = await fs.readJSON(this.filePath)
  //console.log(JSON.stringify(usersList))
  //localStorage.users = JSON.stringify(usersList);
  // let list = localStorage.users;
   const foundUser = usersList.find(
     (user) => user.username == username && user.password == password
   );
   console.log(foundUser)
   if(foundUser === undefined){
    return "Not Found"
   }else{
    return foundUser;
   }
  // if (foundUser === undefined) {
  //   return undefined;
  // } else {
  //   console.log(foundUser);
  //   loggedInUser = foundUser;
 }
}

export default new UsersRepo();

export async function findUser(username, password) {
  return 'hi'
  // usersList = await fs.readJSON('./../data/users.json')
  // localStorage.users = JSON.stringify(usersList);
  // let list = localStorage.users;
  // const foundUser = usersList.find(
  //   (user) => user.username == username && user.password == password
  // );
  // if (foundUser === undefined) {
  //   return undefined;
  // } else {
  //   console.log(foundUser);
  //   loggedInUser = foundUser;
  //   return loggedInUser;
  // }
}


async function loadUsers() {
  let users = localStorage.users;
  let userDataResponse = "";
  if (users) {
    users = JSON.parse(localStorage.users);
  } else {
    userDataResponse = await fetch("/app/data/users.json");
    users = await userDataResponse.json();
  }
  return users;
}

export async function getLoggedInUser() {
  const users = await loadUsers();
  loggedInUser = localStorage.loggedInUser;
  return JSON.parse(loggedInUser);
}

export async function uploadItemRpo(newItem) {
  let loggedInUser = await getLoggedInUser();
  let users = JSON.parse(localStorage.users);
  if (!loggedInUser) {
    alert("No user logged in.");
    return;
  }
  console.log(loggedInUser);
  let currentItemList = loggedInUser.listOfCurrentItems;
  console.log(currentItemList);
  // currentItemList.push(newItem)
  // console.log(localStorage.listOfCurrentItems);
  // currentItemList.map(item=> loggedInUser.listOfCurrentItems.push(item))
  loggedInUser.listOfCurrentItems.push(newItem);
  const foundUsers = users.find(
    (user) => user.username == loggedInUser.username
  );
  foundUsers.listOfCurrentItems.push(newItem);

  localStorage.users = JSON.stringify(users);
  localStorage.loggedInUser = JSON.stringify(loggedInUser);
  alert("Item uploaded successfully.");
  return "Item uploaded successfully.";
}
