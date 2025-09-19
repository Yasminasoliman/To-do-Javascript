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

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const MONTHS = [
  "Jun",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// 6 - 11 morning
// 12 - 18 afternoon
// 19 - 5 night
function dayGreeting(hour) {
  if (hour > 6 && hour < 12) return "Good morning";
  else if (hour >= 12 && hour < 18) return "Good afternoon";
  else return "Good night";
}

let date = new Date();
today.textContent = `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${
  MONTHS[date.getMonth()]
} ${date.getFullYear()}`;

greeting.children[0].textContent = `${dayGreeting(date.getHours())}, ${
  userData.firstName
}`;
