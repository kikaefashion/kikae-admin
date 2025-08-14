import { baseUrl } from "@/networking/apiUrl";

export const updateLogistic = async (
  id: string | number,
  name: string,
  email: string,
  phone: string,
  //  address: string,
  extra_pickup_increment: number,
  extra_weight_fee: number
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
        extra_pickup_increment,
        extra_weight_fee,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      console.log({ result });
      alert("failed to update logistic destination");

      return;
    }
    console.log({ result });
    alert("logistic destination updated!");
    return;
  } catch (error) {
    console.log(error);
  }
};
