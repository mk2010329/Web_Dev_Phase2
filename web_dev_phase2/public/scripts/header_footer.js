
document.addEventListener("DOMContentLoaded", async () => {

    fetch('/header.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('header').innerHTML = html;

         // Query statsLink after header.html content is loaded and inserted
         const statsLink = document.querySelector('.statistics-link');
        
         // If the current user is an admin, show the Statistics link
         if (isAdmin()) {
             statsLink.style.display = "block";
         }else{
            statsLink.style.display='none'
         }
    });


    fetch('/footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footer').innerHTML = html;
    });
  
   
  });
  
   // Logic to check if the user is an admin
  function isAdmin() {
    const user = JSON.parse(localStorage.loggedInUser)
    if(user.username===3){
      return true
    }else{
      return false
    }
    // Return true if the user is an admin, false otherwise
  }

