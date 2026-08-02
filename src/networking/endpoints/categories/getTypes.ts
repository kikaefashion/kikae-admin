import { baseUrl } from "@/networking/apiUrl";

export const getTypes = async (subCategoryId?: number) => {
  try {
    const url = subCategoryId
      ? `${baseUrl}/getTypes?sub_category_id=${subCategoryId}`
      : `${baseUrl}/getTypes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return;
    }
    console.log({ result });
    return result;
  } catch (error) {
    console.log(error);
  }
};
