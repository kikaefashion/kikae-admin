import { baseUrl } from "@/networking/apiUrl";

export const getReportedProducts = async () => {
  try {
    const response = await fetch(`${baseUrl}/getReportProduct`, {
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
