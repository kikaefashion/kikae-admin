import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const deleteProduct = async (product_id: string | number) => {
  const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/products/delete`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        product_id,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert("failed to delete product");
      return;
    }
    alert("Product deleted successfully");
    return result;
  } catch (error) {
    console.log(error);
  }
};
