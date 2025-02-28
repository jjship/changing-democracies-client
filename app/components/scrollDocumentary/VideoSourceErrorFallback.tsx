// components/VideoSourceErrorFallback.tsx
import { VideoSourceError } from "./videoSource";

interface VideoSourceErrorFallbackProps {
  error: VideoSourceError;
  onRetry?: () => void;
}

const VideoSourceErrorFallback = ({
  error,
  onRetry,
}: VideoSourceErrorFallbackProps) => {
  const getErrorMessage = (error: VideoSourceError) => {
    switch (error.statusCode) {
      case 401:
        return "Authentication failed. Please check your API key.";
      case 403:
        return "You don't have permission to access this video.";
      case 404:
        return "Video not found. It may have been removed or is unavailable.";
      case 429:
        return "Too many requests. Please try again later.";
      default:
        return error.message || "Failed to load video source";
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-black/90">
      <div className="max-w-md rounded-lg bg-black/80 p-6 text-center">
        <h2 className="mb-2 text-xl font-bold text-white">
          Video Source Error
        </h2>
        <p className="mb-4 text-gray-300">{getErrorMessage(error)}</p>
        {error.details && (
          <p className="mb-4 text-sm text-gray-400">{error.details}</p>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded bg-white px-4 py-2 text-black transition-colors 
                     duration-200 hover:bg-gray-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoSourceErrorFallback;
