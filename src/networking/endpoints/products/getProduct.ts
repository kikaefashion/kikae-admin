import { baseUrl } from "@/networking/apiUrl";

export const getProductDetail = async (product_id: string | number) => {
  try {
    const response = await fetch(`${baseUrl}/getProduct/${product_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //  Authorization: `Bearer 9|wIWpd5hTwD7TpChIvNxgb7Eh8R9vaKYseBzSPs7S`,
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
