import { baseUrl } from "../apiUrl";
import Cookies from "universal-cookie";

export const getCurrentAdmin = async () => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/currentUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const user = await response.json();

    return user;
  } catch (error) {
    console.error(error);
  }
};
