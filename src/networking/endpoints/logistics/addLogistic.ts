import { baseUrl } from "@/networking/apiUrl";

export const addLogistic = async (
  name: string,
  email: string,
  phone: string,
  //address: string
  extra_pickup_increment: number,
  extra_weight_fee: number
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
        extra_pickup_increment,
        extra_weight_fee,
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
