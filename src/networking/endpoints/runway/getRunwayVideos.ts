import { baseUrl } from "@/networking/apiUrl";

export const getRunwayVideos = async () => {
  try {
    const response = await fetch(`${baseUrl}/getBoomerangs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching runway videos data: ", error);
  }
};
