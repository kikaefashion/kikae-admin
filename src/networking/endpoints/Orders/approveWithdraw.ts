import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

//import { NotificationManager } from "@/components/customNotification/NotificationManager";

export const withdraw = async (
id:number
) => {
  try {
    const cookies = new Cookies()
    const token = cookies.get("authToken")

    const response = await fetch(`${baseUrl}/admin/pending_withdraw/accept`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify({
        id
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
