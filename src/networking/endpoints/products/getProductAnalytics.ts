import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const getProductAnalytics = async (productId: string) => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");

  try {
    const response = await fetch(`${baseUrl}/product/analytics`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        product_id: productId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product analytics");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching product analytics:", error);
    throw error;
  }
};
