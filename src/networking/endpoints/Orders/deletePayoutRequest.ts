import { baseUrl } from "@/networking/apiUrl";

//import { NotificationManager } from "@/components/customNotification/NotificationManager";

export const deletePayoutRequest = async (id: number) => {
  try {
    //   console.log(amount, account_number, bank_code, name);
    const response = await fetch(`${baseUrl}/admin/deletePendingWithdraw`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
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
