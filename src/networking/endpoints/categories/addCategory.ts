import { baseUrl } from "@/networking/apiUrl";
import Cookies from "universal-cookie";

export const addCategory = async (name: string, description: string) => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  try {
    const response = await fetch(`${baseUrl}/admin/addToProductCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const data = await response.json();
    console.log({ data });

    if (!response.ok) {
      alert("Failed to add category");
      return;
    }
    alert("Category added successfully");
    return data;
  } catch (error) {
    console.log(error);
  }
};
