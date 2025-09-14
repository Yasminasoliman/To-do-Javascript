const formElement = document.getElementById("loginForm");
function handleSubmit(e) {
  e.preventDefault();
  console.log(formElement);
  const formData = new FormData(formElement);
  const userData = Object.fromEntries(formData);
  console.log(userData);
  window.location.replace("tasks.html");
}

formElement.addEventListener("submit", handleSubmit);
