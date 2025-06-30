import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const getTotalSales = async () => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  const response = await fetch(`${baseUrl}/admin/orders/total-sales`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  return data;
};
