import { baseUrl } from "@/networking/apiUrl";

export const getStoreProducts = async (store_id: string) => {
  try {
    const response = await fetch(`${baseUrl}/getStoreProducts/${store_id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching store products: ", error);
  }
};
