// ===================================
// AI Code Review Assistant - Signup
// ===================================

// Redirect if already logged in
if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "index.html";
}

const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const signupBtn = document.getElementById("signupBtn");
const message = document.getElementById("message");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

// Show / Hide Password
togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        passwordInput.type = "password";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }

});

// Show / Hide Confirm Password
toggleConfirmPassword.addEventListener("click", () => {

    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        toggleConfirmPassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        confirmPasswordInput.type = "password";
        toggleConfirmPassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }

});

// Email Validation
function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Signup
form.addEventListener("submit", function (e) {

    e.preventDefault();

    message.style.color = "red";

    const fullName = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (fullName === "") {
        message.innerText = "Please enter your full name.";
        return;
    }

    if (email === "") {
        message.innerText = "Please enter your email.";
        return;
    }

    if (!validEmail(email)) {
        message.innerText = "Please enter a valid email.";
        return;
    }

    if (password === "") {
        message.innerText = "Please create a password.";
        return;
    }

    if (password.length < 6) {
        message.innerText = "Password must be at least 6 characters.";
        return;
    }

    if (confirmPassword === "") {
        message.innerText = "Please confirm your password.";
        return;
    }

    if (password !== confirmPassword) {
        message.innerText = "Passwords do not match.";
        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email
    const exists = users.find(user => user.email === email);

    if (exists) {
        message.innerText = "Email is already registered.";
        return;
    }

    // Save user
    users.push({
        name: fullName,
        email: email,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    signupBtn.disabled = true;
    signupBtn.innerHTML = "Creating Account...";

    message.style.color = "green";
    message.innerHTML = "Account created successfully! Redirecting...";

    setTimeout(() => {

        window.location.href = "login.html";

    }, 1500);

});