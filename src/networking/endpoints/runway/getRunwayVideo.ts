import { baseUrl } from "@/networking/apiUrl";

export const getRunwayVideo = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/getBoomerangs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching runway videos data: ", error);
  }
};
