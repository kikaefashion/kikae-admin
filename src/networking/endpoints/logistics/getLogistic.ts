import { baseUrl } from "@/networking/apiUrl";

export const getLogistic = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/getLogistic`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
