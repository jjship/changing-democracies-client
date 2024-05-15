// app/components/FullscreenPlayer.tsx
import React from "react";
import { VideoDbEntry } from "../../types/videos";

interface FullscreenPlayerProps {
  film: VideoDbEntry;
  onClose: () => void;
}

const FullscreenPlayer: React.FC<FullscreenPlayerProps> = ({
  film,
  onClose,
}) => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black text-white">
      <iframe
        src={`https://bunny.net/stream/cdn-player/${film.guid}`}
        frameBorder="0"
        allowFullScreen
        className="h-4/5 w-4/5"
      ></iframe>
      <h1 className="mt-4 text-3xl font-bold">{film.title}</h1>
      {/* <p className="mt-2 text-xl">{film.country}</p>
      <p className="mt-2 text-lg">{film.tags.join(", ")}</p> */}
      <button
        className="mt-4 rounded bg-red-500 px-4 py-2 transition-colors hover:bg-red-700"
        onClick={onClose}
      >
        Back
      </button>
    </div>
  );
};

export default FullscreenPlayer;
