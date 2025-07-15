import { baseUrl } from "@/networking/apiUrl";

export const addLogisticDestination = async (
  logistic_id: string | number,
  area: string,
  cost: string,
  state_id: string | number
) => {
  try {
    const response = await fetch(`${baseUrl}/addLogisticDestination`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        // id,
        logistic_id,
        area,
        state_id,
        cost,
      }),
    });
    const result = await response.json();
    console.log({ result });

    if (!response.ok) {
      alert("failed to add logistic Destination");
      return;
    }

    alert("logistic destination added!");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
