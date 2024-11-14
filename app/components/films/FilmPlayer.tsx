import { useEffect, useRef } from "react";
import { Player } from "player.js";
import CloseButton from "../../components/films/CloseButton";
import { useFilmsContext } from "./FilmsContext";

export default function FilmPlayer(props: { onEnded?: () => void }) {
  const { nowPlaying } = useFilmsContext();
  const { onEnded } = props;
  const src = `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${nowPlaying}?autoplay=true&captions=EN`;
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current && onEnded) {
      const player = new Player(iframeRef.current);

      player.on("ready", () => {
        player.on("ended", () => {
          onEnded();
        });

        player.play();
      });
    }
  }, [onEnded]);

  return (
    nowPlaying && (
      <div
        id="player-container"
        className="absolute left-0 top-0 z-50 h-full w-full bg-black_bg"
      >
        <CloseButton />

        <iframe
          ref={iframeRef}
          src={src}
          className="absolute left-0 top-0 h-full w-full"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          onEnded={onEnded}
        ></iframe>
      </div>
    )
  );
}
