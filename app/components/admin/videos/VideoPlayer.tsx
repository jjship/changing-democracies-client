"use client";

export default function VideoPlayer({
  videoId,
  auto,
}: {
  videoId: string;
  auto?: boolean;
}) {
  const src = `https://iframe.mediadelivery.net/embed/${
    process.env.NEXT_PUBLIC_LIBRARY_ID
  }/${videoId}?autoplay=${auto ?? "false"}`;
  return (
    <div className="relative h-0" style={{ paddingTop: "56.25%" }}>
      <iframe
        src={src}
        loading="lazy"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      ></iframe>
    </div>
  );
}
