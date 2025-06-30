import { baseUrl } from "@/networking/apiUrl";

export const getStoreOrders = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/getStoreOrders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },

      body: JSON.stringify({
        store_id: id,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    console.log({ errors: error });
    throw error;
  }
};
