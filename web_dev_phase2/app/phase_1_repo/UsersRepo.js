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
   const foundUser = usersList.find(
     (user) => user.username == username && user.password == password
   );
   console.log(foundUser)
   if(foundUser === undefined){
    return "Not Found"
   }else{
    return foundUser;
   }
 }

 async rewriteUser(user){
  await fs.writeJSON(this.filePath, user)
  return 'ok'
 }
}

export default new UsersRepo();

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


