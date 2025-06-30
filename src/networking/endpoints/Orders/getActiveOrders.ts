import { baseUrl } from "@/networking/apiUrl";

export const getActiveOrders = async () => {
  const response = await fetch(`${baseUrl}/admin/getActiveOrders`);
  const data = await response.json();
  return data;
};
