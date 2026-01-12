import { baseUrl } from "@/networking/apiUrl";
import { OrdersResponseType } from "@/types/apiResponseType/OrdersResponseType";
import Cookies from "universal-cookie";

export const getAllOrders = async (
  page: number,
  keyword?: string,
  start_date?: string,
  end_date?: string,
  status?: string
): Promise<OrdersResponseType> => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  const response = await fetch(`${baseUrl}/admin/orders?page=${page ?? 1}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      keyword,
      start_date,
      end_date,
      status,
    }),
  });
  const data = await response.json();
  return data;
};
