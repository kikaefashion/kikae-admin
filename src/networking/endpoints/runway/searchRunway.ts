import { baseUrl } from "@/networking/apiUrl";

export const searchRunway = async (keyword: string) => {
  try {
    const response = await fetch(`${baseUrl}/searchBoomerangs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        keyword,
      }),
    });
    const result = await response.json();
    console.log({ result });

    if (!response.ok) return;

    return result;
  } catch (error) {
    console.log(error);
  }
};
