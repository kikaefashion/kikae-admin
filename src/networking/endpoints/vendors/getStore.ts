import { baseUrl } from "@/networking/apiUrl";

export const getStore = async (store_id: string) => {
  try {
    const response = await fetch(`${baseUrl}/getStore/${store_id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching store data: ", error);
  }
};
