import { baseUrl } from "@/networking/apiUrl";

export const getMyBanks = async (store_id: string) => {
  try {
    console.log({ store_id });
    const response = await fetch(`${baseUrl}/getMyBanks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: store_id,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    console.log({ error });
  }
};
