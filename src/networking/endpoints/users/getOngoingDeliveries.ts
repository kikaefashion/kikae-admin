import { baseUrl } from "@/networking/apiUrl";

export const getOngoingDelivery = async (user_id: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/deliveries/ongoing?user_id=${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const result = await response.json();
    if (!response) {
      console.log({ response });
      console.log({ result });

      return;
    }

    return result;
  } catch (error) {
    console.log({ error });
  }
};
