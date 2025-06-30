import Cookies from "universal-cookie";
import { baseUrl } from "../apiUrl";

export const getAllAdmin = async () => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/getAllAdmin`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
