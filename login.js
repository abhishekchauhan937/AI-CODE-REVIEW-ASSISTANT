// ================================
// AI Code Review Assistant Login
// ================================

// if (localStorage.getItem("isLoggedIn") === "true") {
//     window.location.href = "index.html";
// }

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const remember = document.getElementById("remember");
const message = document.getElementById("message");
const loginBtn = document.getElementById("loginBtn");
const togglePassword = document.getElementById("togglePassword");

// Load remembered email
window.onload = function () {
    if (localStorage.getItem("rememberMe") === "true") {
        remember.checked = true;
        email.value = localStorage.getItem("savedEmail") || "";
    }
};

// Show / Hide Password
togglePassword.addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        password.type = "password";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }

});

// Email Validation
function validEmail(mail) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
}

// Login
form.addEventListener("submit", function (e) {

    e.preventDefault();

    message.style.color = "red";

    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    if (userEmail === "") {
        message.innerText = "Please enter your email.";
        return;
    }

    if (!validEmail(userEmail)) {
        message.innerText = "Please enter a valid email.";
        return;
    }

    if (userPassword === "") {
        message.innerText = "Please enter your password.";
        return;
    }

    if (userPassword.length < 6) {
        message.innerText = "Password must be at least 6 characters.";
        return;
    }

    loginBtn.disabled = true;
loginBtn.innerHTML = "Logging in...";

setTimeout(() => {

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.email === userEmail && u.password === userPassword
    );

    if (!user) {
        message.style.color = "red";
        message.innerHTML = "Invalid email or password.";
        loginBtn.disabled = false;
        loginBtn.innerHTML = "Login";
        return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    if (remember.checked) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("savedEmail", userEmail);
    } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedEmail");
    }

    message.style.color = "green";
    message.innerHTML = "Login Successful! Redirecting...";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1200);

}, 1000);

});


// Logout Function
function logout() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

}