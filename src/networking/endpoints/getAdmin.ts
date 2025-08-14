import Cookies from "universal-cookie";
import { baseUrl } from "../apiUrl";

export const getAdmin = async () => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/getAAdmin`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return;
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};
