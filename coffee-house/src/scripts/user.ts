import { UserData } from "./interfaces";

export function saveUserData(userData: UserData): void {
  localStorage.setItem("userData", JSON.stringify(userData));
}

export function getUserData(): UserData | null {
  const userDataJson = localStorage.getItem("userData");
  return userDataJson ? JSON.parse(userDataJson) : null;
}
