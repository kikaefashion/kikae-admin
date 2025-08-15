import { baseUrl } from "../apiUrl";

export const forgotPassword = async (email: string) => {
  try {
    const response = await fetch(`${baseUrl}/admin/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      alert("Could not send mail");
    }

    await response.json();

    alert(`Mail sent to ${email}`);
    return true;
  } catch (error) {
    console.log(error);
  }
};
