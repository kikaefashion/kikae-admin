import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const getCategories = async () => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error fetching product categories: ", error);
  }
};
