import { baseUrl } from "@/networking/apiUrl";

export const getStates = async () => {
  try {
    const response = await fetch(`${baseUrl}/getStates`);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};
