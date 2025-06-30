import { baseUrl } from "@/networking/apiUrl";

export const getProductComments = async (productId: string) => {
  try {
    const response = await fetch(`${baseUrl}/getProductComments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ product_id: productId }),
    });
    const data = await response.json();
    console.log({ data, response });
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log({ error });
  }
};
