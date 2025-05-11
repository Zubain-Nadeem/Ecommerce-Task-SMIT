
function login() {
    location = '../login/login.html'
}

let emailInput = document.querySelectorAll('.email')[0];
let passwordInput = document.querySelectorAll('.password')[0];

function signUp() {
    let email = emailInput.value;
    let password = passwordInput.value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email+password already exists
    let alreadyExists = users.some(user => user.email === email && user.password === password);

    if (alreadyExists) {
        alert("This email and password already exist. Please login.");
        location= "../login/login.html";
    } 
    else { 
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account created! Redirecting to products...");
        location = "../products/product.html";
    }

    emailInput.value = "";
    passwordInput.value = "";
}
