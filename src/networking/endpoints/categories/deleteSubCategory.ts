import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const deleteSubCategory = async (id: number) => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/subcategories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    console.log({ data });

    if (!response.ok) {
      alert("Failed to delete subcategory");
      return;
    }
    alert("Subcategory deleted successfully");
    return data;
  } catch (error) {
    console.log(error);
  }
};
