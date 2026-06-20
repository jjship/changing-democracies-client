import { useEffect, useState, RefObject } from "react";

interface VideoBounds {
  width: number;
  height: number;
  left: number;
  top: number;
}

export const useVideoBounds = (
  videoRef: RefObject<HTMLVideoElement>,
): VideoBounds | null => {
  const [bounds, setBounds] = useState<VideoBounds | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateBounds = () => {
      const rect = video.getBoundingClientRect();
      const containerRect = video.parentElement?.getBoundingClientRect();
      
      if (containerRect) {
        // Calculate the video's rendered size with object-contain
        const videoAspect = video.videoWidth / video.videoHeight;
      const containerAspect = containerRect.width / containerRect.height;

      let width: number;
      let height: number;

      if (videoAspect > containerAspect) {
        // Video is wider - fit to width
        width = containerRect.width;
        height = containerRect.width / videoAspect;
      } else {
        // Video is taller - fit to height
        height = containerRect.height;
        width = containerRect.height * videoAspect;
      }

      // Calculate centered position
      const left = (containerRect.width - width) / 2;
      const top = (containerRect.height - height) / 2;

      setBounds({ width, height, left, top });
      }
    };

    // Initial calculation
    updateBounds();

    // Update on resize
    const resizeObserver = new ResizeObserver(() => {
      updateBounds();
    });

    resizeObserver.observe(video);
    if (video.parentElement) {
      resizeObserver.observe(video.parentElement);
    }

    // Also listen to video metadata loaded
    const handleLoadedMetadata = () => {
      updateBounds();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      resizeObserver.disconnect();
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoRef]);

  return bounds;
};

