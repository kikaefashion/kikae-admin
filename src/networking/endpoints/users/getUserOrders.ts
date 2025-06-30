import { baseUrl } from "@/networking/apiUrl";

export const getUserOrders = async (user_id: string) => {
  try {
    const response = await fetch(`${baseUrl}/getUserOrders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_id,
      }),
    });

    if (!response) {
      console.log({ response });

      return;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log({ error });
  }
};
