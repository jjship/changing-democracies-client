import { useState, useEffect, useRef } from "react";
import {
  VideoQuality,
  DEFAULT_QUALITIES,
  getOptimalQuality,
} from "./videoUtils";

interface AdaptiveQualityOptions {
  initialQuality?: VideoQuality;
  qualities?: VideoQuality[];
}

// Type definition for NetworkInformation API
interface NetworkInformation {
  effectiveType?: string;
  downlink?: number;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

// Extend Navigator interface to include connection properties
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

const useFilmAdaptiveQuality = ({
  initialQuality,
  qualities = DEFAULT_QUALITIES,
}: AdaptiveQualityOptions) => {
  const [currentQuality, setCurrentQuality] = useState<VideoQuality>(
    initialQuality || getOptimalQuality(qualities),
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Use navigator.connection if available (for measuring network conditions)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as NavigatorWithConnection;
    const connection =
      nav.connection || nav.mozConnection || nav.webkitConnection;

    if (connection) {
      const handleConnectionChange = () => {
        setCurrentQuality(getOptimalQuality(qualities, connection));
      };

      connection.addEventListener("change", handleConnectionChange);
      return () =>
        connection.removeEventListener("change", handleConnectionChange);
    }
  }, [qualities]);

  return { currentQuality, setCurrentQuality, videoRef };
};

export default useFilmAdaptiveQuality;
