import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const deactivateUser = async (user_id: string, status: 1 | 0) => {
  try {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const response = await fetch(`${baseUrl}/user/toggle-status`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        user_id,
        status,
      }),
    });
    if (!response.ok) {
      alert("Failed to deactivate user");
      return;
    }
    alert("User deactivated successfully");
    return true;
  } catch (error) {
    console.log(error);
  }
};
