import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

//import { NotificationManager } from "@/components/customNotification/NotificationManager";

export const declinePayoutRequest = async (id: number) => {
  const cookies = new Cookies()
  const token = cookies.get("authToken")
  try {
    //   console.log(amount, account_number, bank_code, name);
    const response = await fetch(`${baseUrl}/admin/pending_withdraw/decline`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify({
        id,
      }),
    });
    const result = await response.json();
    console.log({ result });
    if (!response.ok) {
      alert(result.message);
      return;
    }

    alert(result.message);

    return true;
    /*  Toast.success("Withdrawal successful");
    showToast("withdrawal successful", "success"); */
  } catch (error) {
    console.log(error);
  }
};
