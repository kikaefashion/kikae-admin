import { baseUrl } from "@/networking/apiUrl";
import { ChurnOverviewType } from "@/types/ChurnOverviewType";

export const getChurnOverview = async (
  days: number
): Promise<ChurnOverviewType> => {
  const response = await fetch(
    `${baseUrl}/admin/churnOverview?days=${days.toString()}`
  );

  const result = await response.json();

  console.log({ result });

  return result;
};
