// checkbox accessibility
const themeSwitcher = document.querySelector(
  ".theme-switcher"
) as HTMLDivElement;
const switcherLabel = themeSwitcher.querySelector(
  ".theme-switcher__label"
) as HTMLLabelElement;
const switcherCheckbox = themeSwitcher.querySelector(
  ".theme-switcher__checkbox"
) as HTMLInputElement;

switcherLabel.onkeydown = (event) => {
  if (event.keyCode === 13) {
    switcherLabel.click();
  }
};

// dark theme
const root = document.documentElement;
// checking local storage and if no matching - checking mediaqueries

const storageKey = "theme-preference";
let storagedTheme = null;
// eslint-disable-next-line no-undef
if (localStorage.getItem(storageKey)) {
  // eslint-disable-next-line no-undef
  storagedTheme = localStorage.getItem(storageKey);
}

if (storagedTheme !== null) {
  if (storagedTheme === "dark") {
    root.setAttribute("dark", "true");
  } else if (storagedTheme === "light") {
    root.removeAttribute("dark");
  }
} else {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("dark", "true");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (root.hasAttribute("dark")) {
    switcherCheckbox.checked = true;
  } else {
    switcherCheckbox.checked = false;
  }

  switcherLabel.addEventListener("click", () => {
    toggleTheme();
    const isDark = root.hasAttribute("dark");
    localStorage.setItem("theme-preference", isDark ? "dark" : "light");
  });
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    toggleTheme();
  });

function toggleTheme() {
  switcherLabel.classList.toggle("theme-switcher--dark");
  if (root.hasAttribute("dark")) {
    root.removeAttribute("dark");
  } else {
    root.setAttribute("dark", "true");
  }
}
