import useSWR from "swr";
import { useState, useCallback, useEffect } from "react";

const fetchImage = async (src: string) => {
  const res = await fetch(src);
  if (!res.ok) {
    const error = new Error("Error loading image");
    (error as any).status = res.status;
    throw error;
  }
  return src;
};

const useImageLoader = (src: string | null) => {
  const [retryCount, setRetryCount] = useState(0);
  const [localError, setLocalError] = useState<Error | null>(null);

  const {
    data: imageSrc,
    error: swrError,
    mutate,
  } = useSWR<string, Error>(src, fetchImage, {
    shouldRetryOnError: false,
  });

  const reloadImage = useCallback(() => {
    setRetryCount((prev) => prev + 1);
    setLocalError(null);
    mutate();
  }, [mutate]);

  const manualRetry = useCallback(() => {
    setRetryCount(0);
    setLocalError(null);
    mutate();
  }, [mutate]);

  useEffect(() => {
    if (swrError && retryCount < 5) {
      const retryDelay = Math.min(500 * Math.pow(2, retryCount), 2000);
      const timer = setTimeout(() => {
        reloadImage();
      }, retryDelay);

      return () => clearTimeout(timer);
    } else if (swrError && retryCount >= 5) {
      setLocalError(swrError);
    }
  }, [swrError, retryCount, reloadImage]);

  return {
    imageSrc,
    handleError: () => setLocalError(new Error("Error loading image")),
    handleLoad: () => mutate(),
    reloadImage,
    manualRetry,
    error: localError,
    loading: !imageSrc && !localError,
    retryCount,
  };
};

export default useImageLoader;
