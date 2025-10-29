import { UserData, FormData } from "./interfaces";

export function saveUserData(formData: FormData): void {
  const userData = {
    login: formData.login,
    city: formData.city,
    street: formData.street,
    houseNumber: formData.houseNumber,
    paymentMethod: formData.paymentMethod,
  };

  localStorage.setItem("userData", JSON.stringify(userData));
}

export function getUserData(): UserData | null {
  const userDataJson = localStorage.getItem("userData");
  return userDataJson ? JSON.parse(userDataJson) : null;
}
