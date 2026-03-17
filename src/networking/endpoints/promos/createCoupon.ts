import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const createCoupon = async ({
  couponData,
}: {
  couponData: {
    name: string;
    type: "percentage" | "amount";
    value: number;

    info?: string | undefined;
    code?: string;
    min_price_rule?: number | undefined;
    max_price_rule?: number;
    applied_to: "logistics" | "orders" | "all";
    usage_days?: number | undefined;
    max_users?: number;
    expiry_date?: string;
    allow_multiple: "0" | "1";
    system_only:number
  };
}) => {
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const response = await fetch(`${baseUrl}/admin/create-coupon/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(couponData),
  });

  console.log("Response Status:", response.status);
  // const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to create coupon");
  }

  return await response.json();
};
