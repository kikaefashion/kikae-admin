import { baseUrl } from "@/networking/apiUrl";

//import * as SecureStore from 'expo-secure-store';

export const getUserAddresses = async (userId: string) => {
  try {
    const response = await fetch(`${baseUrl}/getUserAddresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(response, data);
      throw new Error("Something went wrong");
    }

    console.log({ response, data });

    return data;
  } catch (error) {
    console.log(error, "[");
  }
};
