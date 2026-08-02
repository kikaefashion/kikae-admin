import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const addType = async (
  subCategoryId: number,
  name: string,
  description: string,
) => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/product-types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        product_subcategory_id: subCategoryId,
        name,
        description,
      }),
    });
    const data = await response.json();
    console.log({ data });

    if (!response.ok) {
      alert("Failed to add type");
      return;
    }
    alert("Type added successfully");
    return data;
  } catch (error) {
    console.log(error);
  }
};
