import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const editType = async (
  id: number,
  name: string,
  description: string,
) => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    console.log({ id, name, description });
    const response = await fetch(`${baseUrl}/admin/product-types/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        product_subcategory_id: id,
        name,
        description,
      }),
    });
    const data = await response.json();
    console.log({ data });

    if (!response.ok) {
      alert("Failed to edit type");
      return;
    }
    alert("Type edited successfully");
    return data;
  } catch (error) {
    console.log(error);
  }
};
