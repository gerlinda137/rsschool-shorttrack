import {
  // validateDropdown,
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

  // Очищаем и сбрасываем выбор
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

  // Добавляем новые улицы
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

document.addEventListener("DOMContentLoaded", () => {
  initializeDropdowns();
});
