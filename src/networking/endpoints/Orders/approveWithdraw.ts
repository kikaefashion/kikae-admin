import { baseUrl } from "@/networking/apiUrl";

//import { NotificationManager } from "@/components/customNotification/NotificationManager";

export const withdraw = async (
  name: string,
  account_number: number,
  bank_code: number,
  amount: number,
  user_id: string
) => {
  try {
    console.log(amount, account_number, bank_code, name);
    const response = await fetch(`${baseUrl}/paystack/transfer`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        account_number,
        bank_code,
        amount,
        user_id,
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
