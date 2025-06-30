import Cookies from "universal-cookie";
import { baseUrl } from "../apiUrl";

export const getUsers = async () => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    console.log({ authToken });
    const result = await fetch(`${baseUrl}/admin/getAllUsers`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const response = await result.json();

    console.log({ response });

    return response;
  } catch (error) {
    console.log(error);
  }
};
