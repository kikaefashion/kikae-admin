import Cookies from "universal-cookie";
import { baseUrl } from "../apiUrl";

export const getUser = async (id: string) => {
  try {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const response = await fetch(`${baseUrl}/getUser/${id}`, {
      //  method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });

    const result = await response.json();
    console.log({ result, response: response.text });

    if (!response.ok) return;

    console.log({ result, response: response.text });
    return result;
  } catch (error) {
    console.log(error);
  }
};
