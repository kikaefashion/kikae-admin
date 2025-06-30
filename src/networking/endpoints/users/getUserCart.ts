import { baseUrl } from "@/networking/apiUrl";

export const getUserCart = async (userId: string) => {
  try {
    const response = await fetch(`${baseUrl}/getCart`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) {
      console.log({ response });

      return;
    }
    const data = await response.json();
    //console.log({ data });
    return data;
  } catch (error) {
    console.error("Error getting cart: ", error);
    console.log({ error });
  }
};
