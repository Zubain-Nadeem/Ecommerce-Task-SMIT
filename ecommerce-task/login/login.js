
function signUp() {
    location = '../sign/sign.html'
}

let logEmail = document.querySelectorAll('.email')[0];
let logPass = document.querySelectorAll('.password')[0];


function login() {
    let email = logEmail.value;
    let password = logPass.value;

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for matching user
    let matchedUser = users.find(user => user.email === email && user.password === password);

    if (matchedUser) {
      
        location = "../products/product.html";
    } else {
     
        alert("User not found. Please sign up.");
        location = "../sign/sign.html";
    }

    logEmail.value = "";
    logPass.value = "";
}
