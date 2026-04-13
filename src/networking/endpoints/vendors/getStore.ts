import Cookies from "universal-cookie";
import { baseUrl } from "@/networking/apiUrl";

export const getStore = async (store_id: string) => {
    const token = new Cookies()
    const authToken = token.get("authToken")
  try {
    const response = await fetch(`${baseUrl}/store/get/${store_id}`, {
      method: "GET",
      headers: {
        Accept: "Application/Json",
        "Content-type": "Application/Json",
          Authorization: `Bearer ${authToken}`
      },
    });
    const data = await response.json();
    console.log("Single store data: ", data);

    return data;
  } catch (error) {
    console.error("Error fetching store data: ", error);
    return null
  }
};
