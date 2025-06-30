import Cookies from "universal-cookie";
import { baseUrl } from "../apiUrl";

export const sendGeneralNotiification = async (title: string, body: string) => {
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  const response = await fetch(`${baseUrl}/send-to-users`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      role: "user",
      title,
      body,

      user_id: ["all"],
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    alert("could not send notification");
  }
  alert("notification sent!");

  console.log({ result });

  return result;
};
