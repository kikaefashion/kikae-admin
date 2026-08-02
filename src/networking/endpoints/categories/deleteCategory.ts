import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const deleteCategory = async (id: number) => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/categories/${id}`, {
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
      alert("Failed to delete category");
      return;
    }
    alert("Category deleted successfully");
    return data;
  } catch (error) {
    console.log(error);
  }
};
