import { baseUrl } from "@/networking/apiUrl";
//import { getUser } from "@/networking/getUser/getUser";

export const getStoreFollowers = async (
  store_id: string | undefined,
  userId?: string
) => {
  try {
    //const user = await getUser();

    // const userId = user?.data?.id;
    const response = await fetch(`${baseUrl}/getFollowers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: userId,
        user_id: userId,
        store_id: store_id,
      }),
    });
    const data = await response.json();

    console.log({ data, response });

    return data;
  } catch (error) {
    console.error("Error getting store followers: ", error);
  }
};
