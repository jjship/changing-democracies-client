interface VideoPlayerFallbackProps {
  error?: Error;
  onRetry?: () => void;
}

const VideoPlayerFallback = ({ error, onRetry }: VideoPlayerFallbackProps) => (
  <div className="flex h-full w-full items-center justify-center bg-black">
    <div className="text-center text-white">
      <h2 className="text-xl font-bold">Video playback error</h2>
      <p className="mt-2">
        {error?.message || "An error occurred while playing the video"}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded bg-white px-4 py-2 text-black hover:bg-gray-200"
        >
          Retry
        </button>
      )}
    </div>
  </div>
);

export default VideoPlayerFallback;
