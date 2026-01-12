import { baseUrl } from "@/networking/apiUrl";
import { CouponsResponse } from "@/types/CouponTypes";
import Cookies from "universal-cookie";

export const getCoupons = async (): Promise<CouponsResponse | undefined> => {
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/get-all-coupons`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("Response Data:", data);
    if (!response.ok) {
      throw new Error("Failed to fetch coupons");
    }
    return data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
};
