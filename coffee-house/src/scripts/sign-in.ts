import {
  isSignInFormValid,
  validateLogin,
  validatePassword,
} from "./validation";

//login
const loginContainer = document.querySelector(".input--login");
const loginInput = loginContainer?.querySelector("input");
const loginInputError = loginContainer?.querySelector(".input__error");

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

//password
const passwordContainer = document.querySelector(".input--password");
const passwordInput = passwordContainer?.querySelector("input");
const passwordInputError = passwordContainer?.querySelector(".input__error");

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

function updateSignInButton(): void {
  const signInBtn = document.querySelector(
    ".sign-in-form__submit"
  ) as HTMLButtonElement;
  signInBtn.disabled = !isSignInFormValid();
}

function initializeFormValidation(): void {
  const inputs = document.querySelectorAll(
    "input"
  ) as NodeListOf<HTMLInputElement>;

  inputs.forEach((input) => {
    input.addEventListener("input", updateSignInButton);
    input.addEventListener("blur", updateSignInButton);
  });

  updateSignInButton();
}

document.addEventListener("DOMContentLoaded", () => {
  initializeFormValidation();
});
