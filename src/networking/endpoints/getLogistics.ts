import { baseUrl } from "../apiUrl";

export const getLogistics = async () => {
  const response = await fetch(`${baseUrl}/getLogistics`);
  const data = await response.json();
  return data;
};
