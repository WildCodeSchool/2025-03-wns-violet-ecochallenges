import { useCallback } from "react";

// Widget interface provided by Cloudinary with its methods
interface CloudinaryWidget {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

// Result type returned by Cloudinary after an upload
interface CroppingCoordinates {
  custom?: number[][];
  [key: string]: unknown;
}

interface CloudinaryUploadResult {
  event: string;
  info: {
    secure_url: string;
    public_id: string;
    coordinates?: CroppingCoordinates;
    [key: string]: unknown;
  };
}

// Hook configuration options
interface UseCloudinaryWidgetOptions {
  cloudName: string;
  uploadPreset: string;
  onSuccess: (url: string) => void;
  onError?: (error: Error) => void;
  folder: string;
  croppingAspectRatio: number;
}

// Extend the Window interface for Typescript to include Cloudinary
declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: {
          cloudName: string;
          uploadPreset: string;
          sources: string[];
          multiple: boolean;
          maxFiles: number;
          folder: string;
          cropping: boolean;
          croppingAspectRatio: number;
          croppingShowDimensions: boolean;
          croppingCoordinatesMode: string;
          showSkipCropButton: boolean;
          resourceType: string;
        },
        callback: (error: Error | null, result: CloudinaryUploadResult) => void,
      ) => CloudinaryWidget;
    };
  }
}

export function useCloudinaryWidget({
  cloudName,
  uploadPreset,
  onSuccess,
  onError,
  folder,
  croppingAspectRatio,
}: UseCloudinaryWidgetOptions) {
  // useCallback to memoize the openWidget function and avoid unnecessary re-creations
  const openWidget = useCallback(() => {
    if (!window.cloudinary) {
      console.error("Cloudinary widget is not loaded");
      onError?.(new Error("Cloudinary widget is not loaded"));
      return;
    }

    // Create a instance of the Cloudinary upload widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ["local", "camera"], // Allow uploads from local files and camera
        multiple: false, // Only one file accepted
        maxFiles: 1,
        folder, // Organize uploads in a specific folder of Cloudinary
        cropping: true, // Active cropping editor in the widget
        croppingAspectRatio, // Force square aspect ratio for profile pictures
        croppingShowDimensions: true, // Show dimensions while cropping
        croppingCoordinatesMode: "custom", // Use custom coordinates for cropping
        showSkipCropButton: false, // Don't allow skipping the crop step
        resourceType: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          onError?.(error);
          return;
        }

        if (result.event === "success") {
          // Get cropping coordinates if available
          const coordinates = result.info.coordinates;

          if (coordinates?.custom && coordinates.custom.length > 0) {
            const [coords] = coordinates.custom;
            const { public_id } = result.info;

            const dimensions = {
              width: croppingAspectRatio === 1 ? 400 : 600,
              height: croppingAspectRatio === 1 ? 400 : 300,
            };

            // Build URL with crop transformation applied
            const croppedUrl = `https://res.cloudinary.com/${cloudName}/image/upload/c_crop,x_${coords[0]},y_${coords[1]},w_${coords[2]},h_${coords[3]}/c_fill,w_${dimensions.width},h_${dimensions.height},g_auto/${public_id}`;
            onSuccess(croppedUrl);
          } else {
            // Fallback to original URL if no crop coordinates
            onSuccess(result.info.secure_url);
          }

          widget.close();
        }
      },
    );

    widget.open();
  }, [
    cloudName,
    uploadPreset,
    onSuccess,
    onError,
    folder,
    croppingAspectRatio,
  ]);

  return { openWidget };
}
