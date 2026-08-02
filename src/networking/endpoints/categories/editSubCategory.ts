import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const editSubCategory = async (
  id: number,
  name: string,
  description: string,
  categoryId: number,
) => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/subcategories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        product_category_id: categoryId,
        name,
        description,
      }),
    });
    const data = await response.json();
    console.log({ data });

    if (!response.ok) {
      alert("Failed to edit subcategory");
      return;
    }
    alert("Subcategory edited successfully");
    return data;
  } catch (error) {
    console.log(error);
  }
};
