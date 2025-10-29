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
  console.log({ isValid: true, message: "" });
  return { isValid: true, message: "" };
}
