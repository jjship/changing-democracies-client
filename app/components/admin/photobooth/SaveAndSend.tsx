"use client";

import { FC, useCallback, useState } from "react";
import useImageLoader from "../posters/useImageLoader";
import { deletePoster } from "../posters/actions";
import Image from "next/image";
import { Button } from "../../ui/button";
import EmailForm from "./EmailForm";
import { useBoothContext } from "./BoothContext";

const getImageUrl = (filename: string) =>
  `https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/posters/${filename}`;

const SaveAndSend: FC = () => {
  const [isSending, setIsSending] = useState(false);
  const { filename, setStage, location, stage } = useBoothContext();

  const {
    imageSrc,
    handleError,
    handleLoad,
    reloadImage,
    error,
    loading,
    retryCount,
  } = useImageLoader(getImageUrl(filename ?? ""));

  const handleDelete = useCallback(async (filename: string) => {
    await deletePoster(filename);
    setStage(-1);
  }, []);

  const handleSend = () => setIsSending((isSending) => !isSending);

  const handlePublish = () => setStage(-2);

  if (stage !== 4 || !filename) return null;

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
              <p className="text-white">
                Failed to load image. Please try again.
              </p>
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
};

export default SaveAndSend;
