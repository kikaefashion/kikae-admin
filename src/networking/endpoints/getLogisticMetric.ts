import Cookies from "universal-cookie";
import { baseUrl } from "../apiUrl";
import { Logistics_sale_response_type } from "@/types/logisticMetricType";

export const getLogisticMetric = async (
  logistic_id: string,
  start_date?:string,
  end_date?:string
): Promise<Logistics_sale_response_type | undefined> => {
  try {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const response = await fetch(`${baseUrl}/logistics-sales`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ logistic_id,
        start_date,
        end_date

       }),
    });

    const result = await response.json();
    console.log({ result });

    return result;
  } catch (error) {
    console.log(error);
  }
};
