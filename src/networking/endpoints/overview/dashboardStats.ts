import Cookies from "universal-cookie";
import { baseUrl } from "../../apiUrl";

export const getDashboardStats = async () => {
  const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  const response = await fetch(`${baseUrl}/admin/dashboard-stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    console.log({ data });
    throw new Error("Failed to fetch dashboard stats");
  }

  return data;
};
