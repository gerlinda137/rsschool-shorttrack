import { insertLoader } from "./loader";
import {
  isFormValid,
  validateHouseNumber,
  validateLogin,
  validatePassword,
  validatePasswordConfirm,
} from "./validation";
import { FormData, UserData } from "./interfaces";
import { saveUserData } from "./user";

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
const root = document.querySelector("body");

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

//dropdowns

const streetData = {
  "new-york": [
    "Broadway",
    "5th Avenue",
    "Wall Street",
    "Park Avenue",
    "Madison Avenue",
    "Lexington Avenue",
    "Times Square",
    "Central Park West",
    "Greenwich Street",
    "Bowery",
  ],
  london: [
    "Oxford Street",
    "Baker Street",
    "Abbey Road",
    "Downing Street",
    "Carnaby Street",
    "Fleet Street",
    "Regent Street",
    "Bond Street",
    "Piccadilly Circus",
    "The Mall",
  ],
  tokyo: [
    "Takeshita Street",
    "Ginza Street",
    "Shibuya Crossing",
    "Shinjuku Street",
    "Harajuku Street",
    "Roppongi Street",
    "Akihabara Street",
    "Ueno Street",
    "Asakusa Street",
    "Ikebukuro Street",
  ],
};

function updateStreets(city: string | null): void {
  if (!city) return;

  const streetDropdown = document.querySelector(
    ".input--street"
  ) as HTMLDivElement;
  const streetToggle = streetDropdown.querySelector(
    ".input__dropdown-toggle"
  ) as HTMLButtonElement;
  const streetMenu = streetDropdown.querySelector(
    ".input__dropdown-menu"
  ) as HTMLUListElement;
  const streetText = streetDropdown.querySelector(
    ".input__dropdown-text"
  ) as HTMLSpanElement;

  streetMenu.innerHTML = "";
  streetText.textContent = "Select street";
  streetText.style.color = "";
  streetDropdown.classList.remove("error");

  if (!city) {
    streetToggle.disabled = true;
    streetText.textContent = "Select city first";
    streetText.style.color = "var(--placeholder)";
    return;
  }

  streetToggle.disabled = false;

  // новые улицы
  const streets = streetData[city as keyof typeof streetData] || [];
  streets.forEach((street) => {
    const li = document.createElement("li");
    li.className = "input__dropdown-item";
    li.dataset.value = street.toLowerCase().replace(/\s+/g, "-");
    li.textContent = street;

    li.addEventListener("click", () => {
      streetText.textContent = street;
      streetText.style.color = "var(--txt)";
      streetMenu.classList.remove("show");
    });

    streetMenu.appendChild(li);
  });
}

function initializeDropdowns(): void {
  const dropdowns = document.querySelectorAll(
    ".input--dropdown"
  ) as NodeListOf<HTMLDivElement>;

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(
      ".input__dropdown-toggle"
    ) as HTMLButtonElement;
    const menu = dropdown.querySelector(
      ".input__dropdown-menu"
    ) as HTMLUListElement;
    const items = dropdown.querySelectorAll(
      ".input__dropdown-item"
    ) as NodeListOf<HTMLLIElement>;
    const text = dropdown.querySelector(
      ".input__dropdown-text"
    ) as HTMLSpanElement;

    let selectedValue: string | null = null;

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("show");
    });

    items.forEach((item) => {
      item.addEventListener("click", () => {
        selectedValue = item.dataset.value || null;
        text.textContent = item.textContent || "";
        text.style.color = "var(--txt)";
        menu.classList.remove("show");

        if (dropdown.classList.contains("input--city")) {
          updateStreets(selectedValue);
        }
      });
    });

    document.addEventListener("click", (e) => {
      dropdowns.forEach((dropdown) => {
        const menu = dropdown.querySelector(
          ".input__dropdown-menu"
        ) as HTMLUListElement;
        if (!dropdown.contains(e.target as Node)) {
          menu.classList.remove("show");
        }
      });
    });
  });
}
function updateRegisterButton(): void {
  const registerBtn = document.querySelector(
    ".registration-form__submit"
  ) as HTMLButtonElement;
  registerBtn.disabled = !isFormValid();
}

function initializeFormValidation(): void {
  const inputs = document.querySelectorAll(
    "input"
  ) as NodeListOf<HTMLInputElement>;
  const dropdowns = document.querySelectorAll(
    ".input--dropdown"
  ) as NodeListOf<HTMLDivElement>;

  inputs.forEach((input) => {
    input.addEventListener("input", updateRegisterButton);
    input.addEventListener("blur", updateRegisterButton);
  });

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(
      ".input__dropdown-toggle"
    ) as HTMLButtonElement;
    toggle.addEventListener("click", updateRegisterButton);

    dropdown.addEventListener("click", (e) => {
      if (
        (e.target as HTMLElement).classList.contains("input__dropdown-item")
      ) {
        setTimeout(updateRegisterButton, 10);
      }
    });
  });

  updateRegisterButton();
}
function collectFormData(): FormData {
  const loginInput = document.querySelector(
    ".input--login input"
  ) as HTMLInputElement;
  const passwordInput = document.querySelector(
    ".input--password input"
  ) as HTMLInputElement;
  const confirmPasswordInput = document.querySelector(
    ".input--password-confirm input"
  ) as HTMLInputElement;
  const cityText = document.querySelector(
    ".input--city .input__dropdown-text"
  ) as HTMLSpanElement;
  const streetText = document.querySelector(
    ".input--street .input__dropdown-text"
  ) as HTMLSpanElement;
  const houseInput = document.querySelector(
    ".input--house input"
  ) as HTMLInputElement;
  const paymentRadio = document.querySelector(
    'input[name="payment"]:checked'
  ) as HTMLInputElement;

  const login = loginInput?.value || "";
  const password = passwordInput?.value || "";
  const confirmPassword = confirmPasswordInput?.value || "";
  const city = cityText?.textContent || "";
  const street = streetText?.textContent || "";
  const houseNumber = parseInt(houseInput?.value || "0");
  const paymentMethod = paymentRadio?.value || "cash";

  return {
    login,
    password,
    confirmPassword,
    city,
    street,
    houseNumber,
    paymentMethod,
  };
}

const registerBtn = document.querySelector(
  ".registration-form__submit"
) as HTMLButtonElement;

registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const formData = collectFormData();
  const requestMessage = document.querySelector(".registration__message");
  const container = document.querySelector(".registration") as HTMLElement;

  try {
    const loader = insertLoader(container);
    const response = await fetch(
      "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      if (loader) {
        loader.remove();
      }
      const popupMessage = document.createElement("p");
      popupMessage.className = "popup-success";
      popupMessage.textContent = "Registration successful!";
      if (root) {
        root.append(popupMessage);
      }
      const userData: UserData = {
        login: formData.login,
        city: formData.city,
        street: formData.street,
        houseNumber: formData.houseNumber,
        paymentMethod: formData.paymentMethod,
      };
      saveUserData(userData);
      requestMessage?.classList.add("registration__message--success");
      setTimeout(() => {
        window.location.href = "./cart.html";
      }, 1200);
    } else {
      if (loader) {
        loader.remove();
      }
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        const errorMessage =
          errorData.error || errorData.message || "Unknown error";
        throw new Error(errorMessage);
      } catch {
        throw new Error(errorText);
      }
    }
  } catch (error) {
    if (requestMessage) {
      requestMessage.textContent = `Registration failed: ${
        (error as Error).message
      }`;
      requestMessage?.classList.add("registration__message--fail");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initializeDropdowns();
  initializeFormValidation();
});
