import { baseUrl } from "../apiUrl";

export const handleRegisterAdmin = async (
  email: string,
  password: string,
  password_confirmation: string,
  name: string
) => {
  try {
    const response = await fetch(`${baseUrl}/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
        password_confirmation,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      console.log({
        email,
        name,
        password,
        password_confirmation,
      });
      console.log("error", response, result);
      //  showToast(result.message);
      if (result.message == "validation.unique") {
        alert("email already exists");
        return false;
      }

      return false;
    }

    alert("admin created successfully");
    //showToast("account created successfuly", "error");
    console.log(result);
    // router.push("/login");
  } catch (error) {
    console.log(error);
    alert("an error occured");
    return false;
  }
  return true;
};
