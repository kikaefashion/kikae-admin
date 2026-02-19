import { baseUrl } from "@/networking/apiUrl";
import { orderStatus } from "@/types/UserOrdersTypes";
import Cookies from "universal-cookie";
/* import { showToast } from "@/components/CustomToast/ToastifyComponent";
import { Toast } from "toastify-react-native"; */

export const updateOrderStatus = async (id: number, status: orderStatus) => {
  const cookies = new Cookies()
  const token = cookies.get("authToken")

  console.log({token})
  const response = await fetch(`${baseUrl}/updateOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:`Bearer ${token}`
    },
    body: JSON.stringify({
      id,
      status,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    alert("An error occured");

    console.log(result.errors);
    return;
  }

  alert(result.message);

  console.log({ result });

  return result;
};
