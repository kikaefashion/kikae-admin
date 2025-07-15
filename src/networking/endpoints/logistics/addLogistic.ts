import { baseUrl } from "@/networking/apiUrl";

export const addLogistic = async (
  name: string,
  email: string,
  phone: string
  //address: string
) => {
  try {
    const response = await fetch(`${baseUrl}/addLogistic`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        address: "kikae",
      }),
    });

    if (!response.ok) {
      alert("failed to add logistic");
      return;
    }

    alert("logistic added!");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
