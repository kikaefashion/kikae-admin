import Cookies from "universal-cookie";
import { baseUrl } from "../apiUrl";

export const deleteAdmin = async (id: string) => {
  const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/deleteAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        admin_id: id,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert("Failed to delete admin");
    }
    alert("Admin deleted successfuly");
    return result;
  } catch (error) {
    console.log(error);
  }
};
