import { baseUrl } from "@/networking/apiUrl";

export const updateLogisticDestination = async (
  logistic_id: string | number,
  id: string | number,

  area: string,
  cost: string,
  state_id: string | number
) => {
  try {
    const response = await fetch(`${baseUrl}/updateLogisticDestination`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        logistic_id,
        area,
        state_id,
        cost,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      alert("failed to update logistic destination");
      console.log({ result });
      return;
    }

    alert("logistic destination updated!");
    return;
  } catch (error) {
    console.log(error);
  }
};
