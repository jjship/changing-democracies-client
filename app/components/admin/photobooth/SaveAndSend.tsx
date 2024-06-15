"use client";

import { FC, useCallback, useEffect, useState } from "react";
import useImageLoader from "../posters/useImageLoader";
import { deletePoster } from "../posters/actions";
import Image from "next/image";
import { Button } from "../../ui/button";
import EmailForm from "./EmailForm";
import { useBoothContext } from "./BoothContext";
import { Skeleton } from "../../ui/skeleton";

const SaveAndSend: FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const {
    filename,
    setFilename,
    setStage,
    location,
    stage,
    setUserName,
    setStatements,
  } = useBoothContext();

  useEffect(() => {
    if (!filename) return;
    setImageUrl(
      `https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/posters/${filename}`,
    );
  }, [filename]);

  const {
    imageSrc,
    handleError,
    handleLoad,
    error,
    loading,
    retryCount,
    manualRetry,
  } = useImageLoader(imageUrl);

  const handleDelete = useCallback(
    async (filename: string) => {
      setUserName(null);
      setStatements(null);
      await deletePoster(filename);
      setFilename("");
      setStage(-1);
    },
    [filename, setFilename, setStage, setStatements, setUserName],
  );

  const handleSend = () => setIsSending((isSending) => !isSending);

  const handlePublish = () => setStage(-2);

  if (stage !== 4 || !imageUrl || !filename) return null;

  const buttonStyles =
    "bg-green_accent hover:bg-yellow_secondary text-black_bg p-5 m-5";

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-black_bg">
        <div className="h-2/3 w-4/5">
          {loading && (
            <Skeleton className="h-full w-full bg-slate-100 dark:bg-black" />
          )}
          {error && (
            <div className="text-red-500">
              <p>Error: {error.message}</p>
            </div>
          )}
          {!loading && !error && (
            <img
              src={imageSrc}
              alt="User made poster"
              onLoad={handleLoad}
              onError={handleError}
              className="mx-auto max-h-full max-w-full"
            />
          )}
          {error && retryCount > 4 && (
            <div>
              <p className="text-white">
                Failed to load image. Please try again.
              </p>
              <Button onClick={manualRetry}>Retry</Button>
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
          <Button className={buttonStyles} onClick={handleSend}>
            publish & send by e-mail
          </Button>
        </div>
      </div>
      <div hidden={!isSending}>
        <EmailForm
          fileName={filename}
          location={location}
          imageUrl={imageUrl}
        />
      </div>
    </>
  );
};

export default SaveAndSend;
