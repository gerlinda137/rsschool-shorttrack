import {
  validateDropdown,
  validateHouseNumber,
  validateLogin,
  validatePassword,
  validatePasswordConfirm,
} from "./validation";

const loginContainer = document.querySelector(".input--login");
const loginInput = loginContainer?.querySelector("input");
const loginInputError = loginContainer?.querySelector(".input__error");

const passwordContainer = document.querySelector(".input--password");
const passwordInput = passwordContainer?.querySelector("input");
const passwordInputError = passwordContainer?.querySelector(".input__error");

const passwordConfirmContainer = document.querySelector(
  ".input--password-confirm"
);
const passwordConfirmInput = passwordConfirmContainer?.querySelector("input");
const passwordConfirmError =
  passwordConfirmContainer?.querySelector(".input__error");

const houseContainer = document.querySelector(".input--house");
const houseInput = houseContainer?.querySelector("input");
const houseError = houseContainer?.querySelector(".input__error");

//login
loginInput?.addEventListener("blur", () => {
  const value = loginInput.value;
  const validationResult = validateLogin(value);
  if (!validationResult.isValid) {
    loginContainer?.classList.add("error");
    if (loginInputError) {
      loginInputError.textContent = validationResult.message;
    }
  } else {
    loginContainer?.classList.remove("error");
  }
});

// password
passwordInput?.addEventListener("blur", () => {
  const value = passwordInput.value;
  const validationResult = validatePassword(value);
  if (!validationResult.isValid) {
    passwordContainer?.classList.add("error");
    if (passwordInputError) {
      passwordInputError.textContent = validationResult.message;
    }
  } else {
    passwordContainer?.classList.remove("error");
  }
});

// password-confirm
passwordConfirmInput?.addEventListener("blur", () => {
  const passwordValue = passwordInput?.value || "";
  const confirmValue = passwordConfirmInput.value;

  const validationResult = validatePasswordConfirm(passwordValue, confirmValue);
  if (!validationResult.isValid) {
    passwordConfirmContainer?.classList.add("error");
    if (passwordConfirmError) {
      passwordConfirmError.textContent = validationResult.message;
    }
  } else {
    passwordConfirmContainer?.classList.remove("error");
  }
});

//house number
houseInput?.addEventListener("blur", () => {
  const value = houseInput.value;
  const validationResult = validateHouseNumber(value);
  if (!validationResult.isValid) {
    houseContainer?.classList.add("error");
    if (houseError) {
      houseError.textContent = validationResult.message;
    }
  } else {
    houseContainer?.classList.remove("error");
  }
});

//city
const dropdown = document.querySelector(".input--dropdown") as HTMLDivElement;
const toggle = dropdown.querySelector(
  ".input__dropdown-toggle"
) as HTMLButtonElement;
const menu = dropdown.querySelector(
  ".input__dropdown-menu"
) as HTMLUListElement;
const items = dropdown.querySelectorAll(
  ".input__dropdown-item"
) as NodeListOf<HTMLLIElement>;
const error = dropdown.querySelector(".input__error") as HTMLSpanElement;
const text = dropdown.querySelector(".input__dropdown-text") as HTMLSpanElement;

let selectedValue: string | null = null;

toggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

items.forEach((item) => {
  item.addEventListener("click", () => {
    selectedValue = item.dataset.value || null;
    text.textContent = item.textContent || "";
    text.style.color = "var(--txt)";
    menu.classList.remove("show");
    validateDropdown(selectedValue, dropdown, error);
  });
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target as Node)) {
    menu.classList.remove("show");
    validateDropdown(selectedValue, dropdown, error);
  }
});
