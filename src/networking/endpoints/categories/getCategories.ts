import { baseUrl } from "@/networking/apiUrl";

export const getCategories = async () => {
  try {
    const response = await fetch(`${baseUrl}/getProductCategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();

    console.log({ data });
    return data;
  } catch (error) {
    console.error("Error fetching product categories: ", error);
  }
};
