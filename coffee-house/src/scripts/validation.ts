export function validateLogin(value: string): {
  isValid: boolean;
  message: string;
} {
  const trimmedValue = value.trim();

  // At least 3 characters
  if (trimmedValue.length < 3) {
    return {
      isValid: false,
      message: "Login must be at least 3 characters long",
    };
  }

  // Start with a letter
  if (!/^[a-zA-Z]/.test(trimmedValue)) {
    return {
      isValid: false,
      message: "Login must start with an english a letter",
    };
  }

  // Only English letters allowed
  if (!/^[a-zA-Z]+$/.test(trimmedValue)) {
    return { isValid: false, message: "Only English letters are allowed" };
  }
  return { isValid: true, message: "" };
}

export function validatePassword(value: string): {
  isValid: boolean;
  message: string;
} {
  const trimmedValue = value.trim();

  // At least 6 characters
  if (trimmedValue.length < 6) {
    return {
      isValid: false,
      message: "Password must be at least 6 characters long",
    };
  }

  // Must contain at least 1 special character
  // eslint-disable-next-line no-useless-escape
  if (!/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]/.test(trimmedValue)) {
    return {
      isValid: false,
      message: "Password must contain at least 1 special character",
    };
  }

  return { isValid: true, message: "" };
}

export function validatePasswordConfirm(
  password: string,
  passwordConfirm: string
): { isValid: boolean; message: string } {
  const trimmedConfirm = passwordConfirm.trim();

  if (trimmedConfirm !== password) {
    return {
      isValid: false,
      message: "Passwords do not match",
    };
  }

  return { isValid: true, message: "" };
}
