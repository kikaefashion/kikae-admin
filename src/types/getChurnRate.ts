import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";
import { ChurnUserResponse } from "./churnRateType";

export const getChurnRate = async (): Promise<
  ChurnUserResponse | undefined
> => {
  try {
    const cookies = new Cookies();

    const authToken = cookies.get("authToken");
    const response = await fetch(`${baseUrl}/admin/churn`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const result = await response.json();
    return result;
  } catch {}
};
