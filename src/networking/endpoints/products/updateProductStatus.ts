import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const updateProductStatus = async (
  product_id: string | number,
  status: "pending" | "approved" | "unapproved"
) => {
  const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/products/updateStatus`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        product_id,
        status,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert("An error occured");
      return;
    }

    if (status == "approved") {
      alert("This products has been approved");
    } else if (status == "unapproved") {
      alert("This Product has been rejected");
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};
