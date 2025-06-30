import { baseUrl } from "@/networking/apiUrl";

export const getProducts = async () => {
  const response = await fetch(`${baseUrl}/getProducts`);
  const data = await response.json();
  return data;
};
