import { baseUrl } from "../apiUrl";
import Cookie from "universal-cookie";

export const adminLogin = async (email: string, password: string) => {
  const cookies = new Cookie();
  const today = new Date();
  const twoWeeksFromToday = new Date(today);
  try {
    const response = await fetch(`${baseUrl}/admin/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return;
    }

    cookies.set("authToken", result.token, {
      expires: new Date(twoWeeksFromToday.setDate(today.getDate() + 14)),
    });

    return result;
  } catch {}
};
