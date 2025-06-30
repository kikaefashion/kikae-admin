import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const getPendingStores = async () => {
  const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/stores/pending`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const result = await response.json();
    console.log({ result });
    if (!response.ok) {
      return;
    }

    return result;
  } catch {}
};
