import {
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
