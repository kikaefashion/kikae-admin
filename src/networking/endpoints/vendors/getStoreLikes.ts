import { baseUrl } from "@/networking/apiUrl";
//import { getUser } from "@/networking/getUser/getUser";
//import { getUserStore } from "./getUserStore";

export const getStoreLikes = async (storeId: string | undefined) => {
  try {
    // const user = await getUser();
    //console.log({ user });

    //const user_id = user?.data?.id;

    const response = await fetch(`${baseUrl}/getStoreLikes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        store_id: storeId,
      }),
    });
    const data = await response.json();

    console.log({ data, response });

    return data;
  } catch (error) {
    console.error("Error getting store likes: ", error);
  }
};
