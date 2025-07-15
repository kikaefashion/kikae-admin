import { baseUrl } from "@/networking/apiUrl";

export const updateLogistic = async (
  id: string | number,
  name: string,
  email: string,
  phone: string
) => {
  try {
    const response = await fetch(`${baseUrl}/updateLogistic`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        email,
        phone,
        address: "kikae",
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
