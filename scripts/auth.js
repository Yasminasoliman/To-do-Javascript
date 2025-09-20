"use strict";
if (localStorage.getItem("currentUser")) {
  window.location.replace("tasks.html");
}

function inputError(input) {
  document.getElementById(`${input}`).classList.add("input-error");
}
function removeInputError(input) {
  document.getElementById(`${input}`).classList.remove("input-error");
}

function handleLogin(loginForm) {
  // e.preventDefault();
  const formData = new FormData(loginForm);
  const userData = Object.fromEntries(formData);
  if (!userData.email.trim()) {
    inputError("email");
    document.getElementById("emailError").textContent =
      "Please enter your email";
    return;
  }
  if (!userData.password.trim()) {
    inputError("password");
    document.getElementById("passwordError").textContent =
      "Please enter your password";
    return;
  }
  const user = JSON.parse(localStorage.getItem(userData.email));
  if (!user) {
    inputError("email");
    document.getElementById("emailError").textContent =
      "There is no account with this email. Please register first";
  } else if (!(userData.password === user.password)) {
    inputError("password");
    document.getElementById("passwordError").textContent =
      "Password is incorrect";
  } else {
    localStorage.setItem("currentUser", user.email);
    window.location.replace("tasks.html");
  }
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleLogin(loginForm);
  });

  loginForm.addEventListener("input", (e) => {
    removeInputError(`${e.target.name}`);
    document.getElementById(`${e.target.name}Error`).textContent = "";
  });
}

function isValidName(name) {
  const nameRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
  return nameRegex.test(name) && name.length >= 2;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPassword(password) {
  return password.length >= 8;
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirmPassword");

  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmError = document.getElementById("confirmError");

  firstNameInput.addEventListener("blur", () => {
    if (!firstNameInput.value.trim()) {
      firstNameError.textContent = "";
    } else if (!isValidName(firstNameInput.value.trim())) {
      firstNameError.textContent =
        "Name cannot contain numbers or special characters and must be more than one letter";
      firstNameError.className = "error";
      inputError("firstName");
    } else {
      removeInputError("firstName");
      firstNameError.textContent = "Valid name ✔";
      firstNameError.className = "success";
    }
  });

  lastNameInput.addEventListener("blur", () => {
    if (!lastNameInput.value.trim()) {
      lastNameError.textContent = "";
    } else if (!isValidName(lastNameInput.value.trim())) {
      lastNameError.textContent =
        "Name cannot contain numbers or special characters and must be more than one letter";
      lastNameError.className = "error";
      inputError("lastName");
    } else {
      removeInputError("lastName");
      lastNameError.textContent = "Valid name ✔";
      lastNameError.className = "success";
    }
  });

  emailInput.addEventListener("blur", () => {
    if (!emailInput.value.trim()) {
      emailError.textContent = "";
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = "Invalid email format";
      emailError.className = "error";
      inputError("email");
    } else {
      removeInputError("email");
      emailError.textContent = "Valid email ✔";
      emailError.className = "success";
    }
  });

  passwordInput.addEventListener("blur", () => {
    if (!passwordInput.value) {
      passwordError.textContent = "";
    } else if (!isValidPassword(passwordInput.value)) {
      passwordError.textContent = "Password must be at least 8 characters.";
      passwordError.className = "error";
      inputError("password");
    } else {
      removeInputError("password");
      passwordError.textContent = "Password length OK ✔";
      passwordError.className = "success";
    }
  });

  confirmInput.addEventListener("blur", () => {
    if (!confirmInput.value) {
      confirmError.textContent = "";
    } else if (confirmInput.value !== passwordInput.value) {
      confirmError.textContent = "Passwords do not match.";
      confirmError.className = "error";
      inputError("confirmPassword");
    } else {
      removeInputError("confirmPassword");
      confirmError.textContent = "Passwords match ✔";
      confirmError.className = "success";
    }
  });

  // Final check on form submit
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const allInputs = signupForm.querySelectorAll("input");

    allInputs.forEach((input) => {
      if (!input.value.trim()) {
        input.nextElementSibling.textContent = `${input.name.toLowerCase()} cannot be empty`;
        inputError(input.name);
        return;
      }
    });

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    if (!isValidEmail(email)) {
      inputError("email");
      return;
    }

    if (!isValidPassword(password)) {
      inputError("password");
      return;
    }

    if (password !== confirm) {
      inputError("confirmPassword");
      confirmError.textContent = "Passwords do not match.";
      confirmError.className = "error";
      return;
    }

    if (localStorage.getItem(email)) {
      inputError("email");
      emailError.textContent = "This Email already exists";
      emailError.className = "error";
      return;
    }

    // Save user in localStorage
    const userData = { firstName, lastName, email, password, tasks: {} };
    localStorage.setItem(email, JSON.stringify(userData));
    localStorage.setItem("currentUser", email);

    alert("Registered successfully!");
    window.location.replace("tasks.html");
  });
}
