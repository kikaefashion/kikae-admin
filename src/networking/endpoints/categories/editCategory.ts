import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const editCategory = async (
  id: number,
  name: string,
  description: string
) => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/editProductCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        category_id: id,
        name,
        description,
      }),
    });
    const data = await response.json();
    console.log({ data });

    if (!response.ok) {
      alert("Failed to edit category");
      return;
    }
    alert("Category edited successfully");
    return data;
  } catch (error) {
    console.log(error);
  }
};
