import { baseUrl } from "@/networking/apiUrl";
import { CouponType } from "@/types/CouponTypes";
import Cookies from "universal-cookie";

export const getCouponById = async (
  id: string
): Promise<{ success: string; coupon: CouponType } | undefined> => {
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  try {
    const response = await fetch(`${baseUrl}/admin/get-coupon`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    console.log("Response Data:", data);
    if (!response.ok) {
      throw new Error("Failed to fetch coupon");
    }
    return data.coupon;
  } catch (error) {
    console.error("Error fetching coupon:", error);
    throw error;
  }
};
