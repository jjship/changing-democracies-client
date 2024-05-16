"use server";

import CloseButton from "../../components/films/CloseButton";

const FilmPlayer = ({ params }: { params: { id: string } }) => {
  const src = `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${params.id}?autoplay=false`;
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-black">
      {/* Close button */}
      <CloseButton />
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={src}
          loading="lazy"
          className="absolute left-0 top-0 h-full w-full"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        ></iframe>
      </div>
    </div>
  );
};

export default FilmPlayer;
