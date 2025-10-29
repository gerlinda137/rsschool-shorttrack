import { validateLogin } from "./validation";

const loginContainer = document.querySelector(".input--login");
const loginInput = loginContainer?.querySelector("input");
const loginInputError = loginContainer?.querySelector(".input__error");

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
