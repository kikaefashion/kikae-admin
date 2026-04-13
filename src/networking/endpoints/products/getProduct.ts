import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const getProductDetail = async (product_id: string | number) => {
  try {
    const cookies = new Cookies()
    const authToken = cookies.get("authToken")
    const response = await fetch(`${baseUrl}/admin/products/get/${product_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const result = await response.json();
    console.log({ result });
    if (!response.ok) {
      console.log(response);
      return;
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};
