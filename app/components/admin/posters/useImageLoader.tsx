import { useEffect, useState, useCallback } from "react";

const useImageLoader = (src: string) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const reloadImage = useCallback(() => {
    setError(false);
    setRetryCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (error) {
      const retryDelay = Math.min(500 * Math.pow(2, retryCount), 2000);
      const timer = setTimeout(() => {
        setImageSrc(`${src}?retry=${retryCount}`);
        setLoading(true);
        setError(false);
      }, retryDelay);

      return () => clearTimeout(timer);
    }
  }, [error, retryCount, src]);

  const handleError = () => setError(true);

  const handleLoad = () => setLoading(false);

  return {
    imageSrc,
    handleError,
    handleLoad,
    reloadImage,
    error,
    loading,
    retryCount,
  };
};

export default useImageLoader;
