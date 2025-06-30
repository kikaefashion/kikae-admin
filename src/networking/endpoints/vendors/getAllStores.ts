import { baseUrl } from "@/networking/apiUrl";

export const getStores = async () => {
  try {
    const response = await fetch(`${baseUrl}/getStores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return;
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};
