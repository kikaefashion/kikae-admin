import { baseUrl } from "@/networking/apiUrl";

export const deleteUser = async (userId: string) => {
  try {
    const response = await fetch(`${baseUrl}/deleteUserAccount`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert("failed to delete account");
      return;
    }
    alert("Account deleted successfully");
    return result;
  } catch (error) {
    console.log(error);
  }
};
