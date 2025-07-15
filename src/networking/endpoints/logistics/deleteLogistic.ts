import { baseUrl } from "@/networking/apiUrl";

export const removeLogistic = async (id: string | number) => {
  try {
    const response = await fetch(`${baseUrl}/deleteLogistic`, {
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
      alert("failed to delete logistic ");
      console.log({ result });
      return;
    }

    alert("logistic  deleted!");
    return;
  } catch (error) {
    console.log(error);
  }
};
