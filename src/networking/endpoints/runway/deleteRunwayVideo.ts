import { baseUrl } from "@/networking/apiUrl";

export const deleteRunwayVideo = async (videoId: number) => {
  try {
    const response = await fetch(`${baseUrl}/deleteBoomerang`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: videoId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error deleting video: ${response.statusText}`);
    }

    alert("Video deleted successfully");

    return await response.json();
  } catch (error) {
    console.error("Failed to delete runway video:", error);
    throw error;
  }
};
