import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";
import { ChurnUserResponse } from "../../types/churnRateType";

export const getChurnRate = async ({
  filter,
  type,
  per_page,
  pageNumber,
}: {
  filter: "last_30_days" | "last_90_days" | "this_year" | "close_churn" | null;
  type: "users" | "vendors" | "buyers";
  per_page: number | null;
  pageNumber: number;
}): Promise<ChurnUserResponse | undefined> => {
  try {
    const cookies = new Cookies();

    const authToken = cookies.get("authToken");
    const response = await fetch(
      `${baseUrl}/admin/churn?filter=${filter}&type=${type}&per_page=${per_page}&page=${pageNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const result = await response.json();
    console.log({ result });
    return result;
  } catch {}
};
