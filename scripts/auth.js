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
  const user = JSON.parse(localStorage.getItem(userData.email));
  if (!user) {
    inputError("email");
    document.getElementById("emailError").textContent =
      "This Email is not registered";
  } else if (!(userData.password === user.password)) {
    inputError("password");
    document.getElementById("passwordError").textContent =
      "Password is incorrect";
  } else {
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
    document.getElementById(`${e.target.name}`).classList.remove("input-error");
    document.getElementById(`${e.target.name}Error`).textContent = "";
  });
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
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirmPassword");

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmError = document.getElementById("confirmError");

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

    // Save user in localStorage (demo only!)
    const userData = { email, password };
    localStorage.setItem(email, JSON.stringify(userData));

    alert("Registered successfully! Now login.");
    window.location.href = "index.html";
  });
}
