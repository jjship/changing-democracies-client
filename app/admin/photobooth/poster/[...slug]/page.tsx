"use client";

import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import { deletePoster } from "../../../../components/admin/posters/actions";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import EmailForm from "../../../../components/admin/photobooth/EmailForm";
import useImageLoader from "../../../../components/admin/posters/useImageLoader";

interface PosterPageProps {
  params: {
    slug: [string, string];
  };
}

const getImageUrl = (filename: string) =>
  `https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/posters/${filename}`;

export default function PosterPage({
  params: {
    slug: [filename, location],
  },
}: PosterPageProps) {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  const {
    imageSrc,
    handleError,
    handleLoad,
    reloadImage,
    error,
    loading,
    retryCount,
  } = useImageLoader(getImageUrl(filename));

  const handleDelete = useCallback(
    async (fileName: string) => {
      await deletePoster(fileName);
      router.push(
        location ? `/admin/photobooth/${location}` : `/admin/photobooth`,
      );
    },
    [router, location],
  );

  const handleSend = () => setIsSending((isSending) => !isSending);

  const handlePublish = () =>
    router.push(
      location ? `/admin/photobooth/${location}` : `/admin/photobooth`,
    );

  return (
    <>
      <div className="w-1/4">
        {loading && <p>Loading image...</p>}
        <Image
          src={imageSrc}
          alt={filename}
          className="w-full"
          width={800}
          height={800}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
        />
        {error && retryCount > 4 && (
          <div>
            <p>Failed to load image. Please try again later.</p>
            <Button onClick={reloadImage}>Retry</Button>
          </div>
        )}
      </div>
      <Button onClick={() => handleDelete(filename)}>
        delete & start again
      </Button>
      <Button onClick={() => handleSend()}>publish & send by e-mail</Button>
      <div hidden={!isSending}>
        <EmailForm
          fileName={filename}
          location={location}
          imageUrl={getImageUrl(filename)}
        />
      </div>
      <Button onClick={handlePublish}>publish</Button>
    </>
  );
}
