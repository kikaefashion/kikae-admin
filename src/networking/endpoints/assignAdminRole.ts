import Cookies from "universal-cookie";
import { baseUrl } from "../apiUrl";

export const assignAdminRole = async (admin_id: string, admin_role: string) => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  console.log({ admin_id, admin_role });
  try {
    const response = await fetch(`${baseUrl}/admin/assignRole`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        admin_id,
        admin_role,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert("failed to assign role");
      console.log({ result });
      return;
    }
    alert("role assigned");
    return result;
  } catch (error) {
    console.log(error);
  }
};
