import Cookies from "universal-cookie";
import { baseUrl } from "../apiUrl";

export const getReturns = async () => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/returns`, {
      headers: {
        accept: "Application/json",
        "content-type": "Application/json",
        Authorization: `Bearer ${authToken}`,
      },
      //  method: "POST",
    });

    const result = await response.json();
    console.log({ result, response });
    return result;
  } catch (error) {
    console.log(error);
  }
};
