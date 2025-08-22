import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const editAdmin = async (
  admin_id: string,
  name: string,
  //  email: string,
  password: string,
  admin_role: string
) => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  //  console.log({ admin_id, admin_name, admin_email });
  try {
    const response = await fetch(`${baseUrl}/admin/t/${admin_id}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        //admin_id,
        name,
        // email,
        password: password ? password : null,

        admin_role,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert("failed to edit admin");
      console.log({ result });
      return;
    }
    alert("admin edited successfully");
    return result;
  } catch (error) {
    console.log(error);
  }
};
