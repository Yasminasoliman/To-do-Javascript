function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-key]");

  // Switch text direction
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // Apply translations
  elements.forEach((el) => {
    const key = el.getAttribute("data-key");
    const value = translations[lang][key];

    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.setAttribute("placeholder", value);
    } else {
      el.textContent = value;
    }
  });

  document.getElementById("language").value = lang;
}

document.getElementById("language").addEventListener("change", (e) => {
  const selected = e.target.value;
  setLanguage(selected);
  localStorage.setItem("languageSelected", selected);
});

setLanguage(localStorage.getItem("languageSelected") || "en");
