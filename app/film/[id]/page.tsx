"use server";

const FilmPlayer = ({ params }: { params: { id: string } }) => {
  const src = `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_LIBRARY_ID}/${params.id}?autoplay=false`;
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-black">
      <div className="aspect-w-16 aspect-h-9 w-full">
        <iframe
          src={src}
          loading="lazy"
          className="absolute h-full w-full"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        ></iframe>
      </div>
    </div>
  );
};

export default FilmPlayer;
