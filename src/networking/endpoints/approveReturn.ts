import Cookies from "universal-cookie";
import { baseUrl } from "../apiUrl";

export const approveReturn = async (
  id: string,
  logistic_id: string,
  decision: "approved" | "rejected",
  shipping_payer: string,
  note: string
  // images?: string
) => {
  console.log({ id, logistic_id, decision, shipping_payer, note });
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  const response = await fetch(`${baseUrl}/admin/returns/${id}/approve`, {
    method: "POST",
    headers: {
      accept: "Application/json",
      "content-type": "Application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      decision,
      logistic_id,
      shipping_payer,
      note,
      // images,
    }),
  });

  const result = await response.json();

  console.log({ result });

  if (!response.ok) {
    alert("An error Occured!");
    return false;
  }

  alert(decision == "approved" ? "Return approved" : "rejected");

  return result;
};
