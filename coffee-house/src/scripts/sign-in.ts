import { loginUser } from "./api";
import { LoginData, UserData } from "./interfaces";
import { insertLoader } from "./loader";
import { saveUserData } from "./user";
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
    input.addEventListener("blur", updateSignInButton);
  });

  updateSignInButton();
}

function collectSignInData(): LoginData {
  const loginInput = document.querySelector(
    ".input--login input"
  ) as HTMLInputElement;
  const passwordInput = document.querySelector(
    ".input--password input"
  ) as HTMLInputElement;
  const login = loginInput?.value || "";
  const password = passwordInput?.value || "";
  return {
    login,
    password,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  initializeFormValidation();
  const signInBtn = document.querySelector(".sign-in-form__submit");
  const root = document.querySelector("body");
  let loader: HTMLDivElement | null = null;
  const requestMessage = document.querySelector(".sign-in__message");

  signInBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const signInData = collectSignInData();
    try {
      if (root) {
        loader = insertLoader(root);
      }
      const response = await loginUser(signInData);

      console.log("Sign In successful!");
      const popupMessage = document.createElement("p");
      popupMessage.className = "popup-success";
      popupMessage.textContent = "Sign In successful!";
      if (root) {
        root.append(popupMessage);
      }

      const userData: UserData = {
        login: response.data.user.login,
        city: response.data.user.city,
        street: response.data.user.street,
        houseNumber: response.data.user.houseNumber,
        paymentMethod: response.data.user.paymentMethod,
        access_token: response.data.access_token,
      };
      saveUserData(userData);
      if (loader) {
        loader.remove();
      }

      setTimeout(() => {
        window.location.href = "./cart.html";
      }, 1200);
    } catch (error) {
      console.error("Network error:", error);
      if (loader) {
        loader.remove();
      }
      if (requestMessage) {
        let errorMessage = "Sign In failed";
        if (error instanceof Error) {
          try {
            const errorData = JSON.parse(error.message);
            errorMessage = `Sign In failed: ${errorData.error}`;
          } catch {
            errorMessage = `Sign In failed: ${error.message}`;
          }
        }

        requestMessage.textContent = errorMessage;
        requestMessage?.classList.add("sign-in__message--fail");
      }
    }
  });
});
