import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const getDeactivatedVendors = async () => {
  const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/stores/deactivated`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      alert("An error occured");
      return;
    }

    alert("This vendor has been deactivated");
    return result;
  } catch (error) {
    console.log(error);
  }
};
