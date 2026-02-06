import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Extract the public ID from a Cloudinary URL.
 * URL example: https://res.cloudinary.com/dy0orp9pn/image/upload/c_crop,x_100,y_50,w_300,h_300/c_fill,w_400,h_400,g_auto/profile_pictures/abc123.jpg
 * public_id extracted: profile_pictures/abc123
 */
export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const regex = /\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/;
    const match = url.match(regex);

    if (!match) return null;

    let publicId = match[1];

    // If URL contains transformations, we extract the part after the last transformation
    const parts = publicId.split("/");

    const folderIndex = parts.findIndex(
      (part) => !part.includes("_") || part === "profile_pictures",
    );

    if (folderIndex !== -1) {
      publicId = parts.slice(folderIndex).join("/");
    }

    return publicId;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
}

export async function deleteImageFromCloudinary(
  publicId: string,
): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      console.info(`Image with public_id ${publicId} deleted successfully.`);
      return true;
    } else if (result.result === "not found") {
      console.warn(`Image with public_id ${publicId} not found.`);
      return false;
    } else {
      console.error(
        `Failed to delete image with public_id ${publicId}:`,
        result,
      );
      return false;
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return false;
  }
}

export function isCloudinaryUrl(url: string): boolean {
  return (
    url.includes("res.cloudinary.com") &&
    url.includes(process.env.CLOUDINARY_CLOUD_NAME ?? "")
  );
}

export function isDefaultAvatar(url: string): boolean {
  return url.includes("ui-avatars.com");
}

export default cloudinary;
