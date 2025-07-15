import { baseUrl } from "@/networking/apiUrl";

export const removeLogisticDestination = async (id: string | number) => {
  try {
    const response = await fetch(`${baseUrl}/deleteLogisticDestination`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      alert("failed to delete logistic destination");
      console.log({ result });
      return;
    }

    alert("logistic destination deleted!");
    return;
  } catch (error) {
    console.log(error);
  }
};
