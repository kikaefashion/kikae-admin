import { baseUrl } from "@/networking/apiUrl";

export const getSubCategories = async () => {
  try {
    const response = await fetch(`${baseUrl}/getCategories`, {
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
    console.log({ result });
    return result;
  } catch (error) {
    console.log(error);
  }
};
