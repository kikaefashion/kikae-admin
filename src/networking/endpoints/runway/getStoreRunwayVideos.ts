import { baseUrl } from "@/networking/apiUrl";

export const getStoreRunwayVideos = async (storeID: string) => {
  try {
    const response = await fetch(`${baseUrl}/getStoreBoomerangs/${storeID}`);

    const result = await response.json();

    console.log({ result });

    return result;
  } catch (error) {
    console.log({ error });
  }
};
