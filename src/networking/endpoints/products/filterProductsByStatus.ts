import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const filterProductsByStatus = async (
  status: "pending" | "approved" | "unapproved"
) => {
  const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/products/filterByStatus`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ status }),
    });
    const result = await response.json();
    console.log({ result });
    if (!response.ok) {
      return;
    }

    return result;
  } catch {}
};
