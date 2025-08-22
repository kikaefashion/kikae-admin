import { baseUrl } from "@/networking/apiUrl";

export const getLogisticsMetrics = async (
  storeId: string,
  start_date?: string,
  end_date?: string
) => {
  try {
    const response = await fetch(`${baseUrl}/logistics-metrics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        store_id: storeId,
        start_date,
        end_date,
      }),
    });

    if (!response.ok) {
      console.error("Failed to get logistics metrics", response.statusText);
      return;
    }

    const result = await response.json();
    console.log("Logistics metrics fetched successfully", result);
    return result;
  } catch (error) {
    console.error("Error fetching logistics metrics", error);
  }
};
