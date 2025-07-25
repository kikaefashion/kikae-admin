import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const deleteVendor = async (store_id: string) => {
  const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/stores/delete`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        store_id,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert("An error occured");
      return;
    }

    alert("This vendor has been deleted");
    return result;
  } catch (error) {
    console.log(error);
  }
};
