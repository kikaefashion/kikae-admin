
import { baseUrl } from "../apiUrl";


function base64ToFile(
  base64Data: string,
  filename: string,
  mimeType: string
): File {
  const byteString = atob(base64Data.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}

export const uploadFile = async (
  fileType: string,
  uri: string,
  type?: "video" | "image"
) => {
  try {
    if (!uri) return;

    const formData = new FormData();

    if (uri.startsWith("data:")) {
      // ✅ Handle base64 from Web (image or video)
      const mimeMatch = uri.match(/data:(.*);base64/);
      if (!mimeMatch) {
        alert("Invalid file format");
        return;
      }
      const mimeType = mimeMatch[1]; // e.g., "video/mp4" or "image/webp"
      const extension = mimeType.split("/")[1]; // e.g., "mp4" or "webp"
      const isVideo = mimeType.startsWith("video");

      const file = base64ToFile(
        uri,
        `${isVideo ? "video" : "photo"}.${extension}`,
        mimeType
      );
      formData.append("file", file);
    } else if (uri.startsWith("blob:")) {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const mimeType = blob.type || `image/${fileType}`; // Default to image/webp
        const extension = mimeType.split("/")[1];
        const fileName =
          type === "video" ? `video.${extension}` : `photo.${extension}`;

        const file = new File([blob], fileName, { type: mimeType });
        formData.append("file", file);
      } catch (blobError) {
        console.log("Error processing blob URI:", blobError);
        alert("Failed to process image", );
        return;
      }
    } else {
      // ✅ Handle file:// from mobile
      const fileMimeType =
        type === "video" ? `video/${fileType}` : `image/webp`;
      const fileName = type === "video" ? `video.${fileType}` : `photo.webp`;

      formData.append("file", {
        uri,
        type: fileMimeType,
        name: fileName,
      } as any);
    }

    // OPTIONAL DEBUGGING
    // for (const [key, value] of (formData as any)) {
    //   console.log(`${key}:`, value);
    // }

    const response = await fetch(`${baseUrl}/uploadFile`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        // Do NOT set Content-Type manually
      },
    });

    const result = await response.json();

    console.log({ uploadResult: result });

    if (!response.ok) {
      alert("Failed to upload file");
      alert("Failed to upload file");
      return;
    }

    return result.data;
  } catch (error) {
    console.log({ error });
 alert("Upload failed");
   
  }
};
