import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const getVendorPayouts = async () => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  const response = await fetch(`${baseUrl}/admin/orders/payouts/vendors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch vendor payouts");
  }
  const data = await response.json();
  return data;
};
