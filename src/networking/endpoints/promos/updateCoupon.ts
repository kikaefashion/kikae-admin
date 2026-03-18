import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const updateCoupon = async ({
  id,
  couponData,
}: {
  id: string;
  couponData: {
    name: string;
    type: "percentage" | "amount";
    value: number;
      active: 1|0

    info?: string | undefined;
    code?: string;
    min_price_rule?: number | undefined;
    max_price_rule?: number;
    applied_to: "logistics" | "orders" | "all";
    usage_days?: number | undefined;
    max_users?: number;
    expiry_date?: string;
    allow_multiple: "0" | "1";
  
  };
}) => {
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const response = await fetch(`${baseUrl}/admin/update-coupon`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, ...couponData }),
  });
  const data = await response.json();
  alert("Updated coupon...");
  console.log("Response Status:", data);
  if (!response.ok) {
    throw new Error("Failed to update coupon");
  }
  return data;
};
