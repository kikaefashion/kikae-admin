import { baseUrl } from "@/networking/apiUrl";

export const searchProducts = async (name: string) => {
  try {
    const response = await fetch(`${baseUrl}/searchProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
