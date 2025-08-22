import { baseUrl } from "@/networking/apiUrl";

export const getCategoriesSales = async () => {
  try {
    const response = await fetch(`${baseUrl}/getProductCategoriesAndSales`, {
      headers: {
        accept: "Application/json",
        "content-type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) return;

    return result;
  } catch (error) {
    console.log(error);
  }
};
