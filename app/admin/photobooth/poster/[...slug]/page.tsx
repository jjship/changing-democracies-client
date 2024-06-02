"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { deletePoster } from "@/components/admin/posters/actions";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import EmailForm from "@/components/admin/photobooth/EmailForm";
import useImageLoader from "@/components/admin/posters/useImageLoader";

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
      router.push(location ? `/admin/posters/${location}` : `/admin/posters`);
    },
    [router, location],
  );

  const handleSend = () => setIsSending((isSending) => !isSending);

  const handlePublish = useCallback(
    () =>
      router.push(location ? `/admin/posters/${location}` : `/admin/posters`),
    [router, location],
  );

  const buttonStyles =
    "bg-green_accent hover:bg-yellow_secondary text-black_bg p-5 m-5";

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center bg-black_bg">
        <div className="w-1/3 pt-20">
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
        <div>
          <Button
            className={buttonStyles}
            onClick={() => handleDelete(filename)}
          >
            delete & start again
          </Button>
          <Button className={buttonStyles} onClick={handlePublish}>
            publish
          </Button>
          <Button className={buttonStyles} onClick={() => handleSend()}>
            publish & send by e-mail
          </Button>
        </div>
      </div>
      <div hidden={!isSending}>
        <EmailForm
          fileName={filename}
          location={location}
          imageUrl={getImageUrl(filename)}
        />
      </div>
    </>
  );
}
