"use strict";
if (!localStorage.getItem("currentUser")) {
  location.replace("index.html");
}

const currentUserEmail = localStorage.getItem("currentUser");

const userData = JSON.parse(localStorage.getItem(currentUserEmail));

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.replace("index.html");
});

const greeting = document.querySelector(".greeting");
const today = document.querySelector(".date");

const WEEKDAYS = [
  "الاحد",
  "الاثنين",
  "الثلاثاء",
  "الاربعاع",
  "الخميس",
  "الجممه",
  "السبت",
];
const MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "ابريل",
  "مايو",
  "يونيه",
  "يولو",
  "اغسطس",
  "ستمبر",
  "اكتوبر",
  "نوفمبر",
  "ديسمبر",
];
// 5 - 11 morning
// 12 - 17 afternoon
// 18 - 21 evening
// 19 - 4 night
function dayGreeting(hour) {
  const lang = localStorage.getItem("languageSelected");
  if (hour >= 5 && hour < 12) return translations[lang]["goodmorning"];
  else if (hour >= 12 && hour < 18) return translations[lang]["goodafternoon"];
  else if (hour >= 18 && hour < 22) return translations[lang]["goodevening"];
  else return translations[lang]["goodnight"];
}

let date = new Date();
const dayName = WEEKDAYS[date.getDay()];
const monthName = MONTHS[date.getMonth()];
const dayNumber = date.getDate();
const year = date.getFullYear();

console.log(today);
// today.textContent = `${WEEKDAYS[date.getDay()]}, ${date.getDate()}
// ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
if (localStorage.getItem("languageSelected") === "en") {
  today.textContent = date.toDateString();
} else {
  today.textContent = `${dayName} 
  ${new Intl.NumberFormat("ar-EG").format(dayNumber)}
  ${monthName} 
  ${new Intl.NumberFormat("ar-EG").format(year)}`;
}

greeting.children[0].textContent = `${dayGreeting(date.getHours())}, ${
  userData.firstName
}`;

function taskTemplate(taskId, taskName, isChecked = false) {
  return `<div class="task" id=${taskId}>
  <img class="checkbox" src=${
    isChecked
      ? "./assets/svgs/checked-box.svg"
      : "./assets/svgs/unchecked-box.svg"
  } >
  <span>${taskName}</span>
  <img class="edit" src="./assets/svgs/edit-icon.svg">
  <img class="delete" src="./assets/svgs/delete-icon.svg">
  </div>`;
}

// Display user tasks
const taskContainer = document.getElementById("taskContainer");
if (Object.keys(userData.tasks).length > 0) {
  taskContainer.innerHTML = "";
  for (let task in userData.tasks) {
    taskContainer.innerHTML += taskTemplate(
      task,
      userData.tasks[task].taskName,
      userData.tasks[task].isChecked
    );
    console.log(task);
  }
} else {
  taskContainer.innerHTML = `<div class="nothing-to-do">
  <img src="./assets/svgs/nothingtodo.svg" />
  <p>Seems like there is nothing to do...</p>
  </div>`;
}

const addTask = document.getElementById("addTask");
addTask.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask = document.getElementById("newTask");
  // const userTasks = userData.tasks;

  if (newTask.value.trim()) {
    const taskId = new Date().getTime();
    const taskName = newTask.value.trim();
    const isChecked = false;
    userData.tasks[taskId] = { taskName, isChecked };
    console.log(userData);
    localStorage.setItem(currentUserEmail, JSON.stringify(userData));

    if (taskContainer.children[0].className === "nothing-to-do") {
      taskContainer.innerHTML = taskTemplate(taskId, taskName);
    } else {
      taskContainer.innerHTML += taskTemplate(taskId, taskName);
    }
    newTask.value = "";
  }
});

function toggleCheckTask(targetElement) {
  const taskId = targetElement.parentElement.getAttribute("id");
  userData.tasks[taskId].isChecked = userData.tasks[taskId].isChecked
    ? false
    : true;
  localStorage.setItem(currentUserEmail, JSON.stringify(userData));

  targetElement.src = userData.tasks[taskId].isChecked
    ? "../assets/svgs/checked-box.svg"
    : "../assets/svgs/unchecked-box.svg";
}

function renameTask(targetElement) {
  const taskId = targetElement.parentElement.getAttribute("id");
  const input = document.createElement("input");
  input.type = "text";
  input.value = userData.tasks[taskId].taskName;
  input.autofocus = true;

  targetElement.previousElementSibling.innerHTML = "";
  targetElement.previousElementSibling.appendChild(input);

  input.onblur = (e) => {
    userData.tasks[taskId].taskName = e.target.value;
    targetElement.previousElementSibling.innerHTML = `<span>${e.target.value}</span>`;
    localStorage.setItem(currentUserEmail, JSON.stringify(userData));
  };
}

function deleteTask(targetElement) {
  const taskId = targetElement.parentElement.getAttribute("id");
  delete userData.tasks[taskId];
  localStorage.setItem(currentUserEmail, JSON.stringify(userData));

  if (targetElement) targetElement.parentElement.remove();
  if (Object.keys(userData.tasks).length === 0) {
    taskContainer.innerHTML = `<div class="nothing-to-do">
  <img src="./assets/svgs/nothingtodo.svg" />
  <p>Seems like there is nothing to do...</p>
  </div>`;
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkbox")) {
    toggleCheckTask(e.target);
  } else if (e.target.classList.contains("delete")) {
    deleteTask(e.target);
  } else if (e.target.classList.contains("edit")) {
    renameTask(e.target);
  }
});
