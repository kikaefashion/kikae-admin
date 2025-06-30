import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const getUnapprovedStores = async () => {
  const authToken = new Cookies();
  try {
    const response = await fetch(`${baseUrl}/admin/stores/approved`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const result = await response.json();

    if (!response.ok) {
      return;
    }

    return result;
  } catch {}
};
