//import { findUser} from "../../app/phase_1_repo/UsersRepo.js";
const form = document.querySelector("#login-form");//select the form attribute.

form.addEventListener('submit',handleSubmission);
async function handleSubmission(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const loginOBJ = {};
    for(const [key,value] of formdata){
        loginOBJ[key] = value; //form the login obj.
    }
    console.log(loginOBJ);
    const url = `/api/phase_1/users?user=${loginOBJ.user}&pass=${loginOBJ.pass}`
    const response = await fetch(url)
    const user = await response.json();
    if(user){ // if user exists on the system
        localStorage.loggedInUser = JSON.stringify(user)
    window.location.href = "../home_page.html";
    document.querySelector("#log-in-icon").classList.add("hidden");
    document.querySelector("#rightHeader").classList.remove("hidden");
    }else{
    
    alert("Incorrect Username and/or Password")
    }
}
