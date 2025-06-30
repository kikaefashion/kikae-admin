import { baseUrl } from "@/networking/apiUrl";

export const getProductReviews = async (productId: string) => {
  try {
    const response = await fetch(`${baseUrl}/getReviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error getting product reviews: ", response, data);
      return;
    }
    console.log({ data });

    return data;
  } catch (error) {
    console.error("Error getting product reviews: ", error);
  }
};
