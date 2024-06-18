"use client";

import { FC, useCallback, useEffect, useState } from "react";

import useImageLoader from "../posters/useImageLoader";
import { deletePoster } from "../posters/actions";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import EmailForm from "./EmailForm";
import { editButton } from "../classNames";
import { useBoothContext } from "./BoothContext";

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
  const thisStage = 7;

  useEffect(() => {
    if (!filename) return;
    setImageUrl(
      `https://${process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE}.b-cdn.net/posters/${filename}`,
    );
  }, [filename]);

  useEffect(() => {
    if (stage === thisStage) {
      setIsSending(false);
    }
  }, [stage, setStage]);

  const {
    imageSrc,
    handleError,
    handleLoad,
    error,
    loading,
    retryCount,
    manualRetry,
    maxRetry,
  } = useImageLoader(imageUrl);

  const handleDelete = useCallback(
    async (filename: string) => {
      setUserName(null);
      setStatements(null);
      await deletePoster(filename);
      setFilename("");
      setStage(0);
    },
    [filename, setFilename, setStage, setStatements, setUserName],
  );

  const handleSend = () => setIsSending((isSending) => !isSending);

  const handlePublish = () => setStage(0);

  if (stage !== thisStage || !imageUrl || !filename) return null;

  const buttonStyles = "bg-darkRed text-2xl hover:bg-pink mx-10 mt-5";

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black_bg">
        <div className="w-4/5">
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
              className="mx-auto"
            />
          )}
          {error && retryCount === maxRetry && (
            <div>
              <p className="mx-auto text-white">
                Failed to load image. Please try again.
              </p>
              <Button className={`${editButton} mx-auto`} onClick={manualRetry}>
                Retry
              </Button>
            </div>
          )}
        </div>
        <div>
          <Button
            className={buttonStyles}
            onClick={() => handleDelete(filename)}
          >
            Delete & Start Again
          </Button>
          <Button className={buttonStyles} onClick={handlePublish}>
            Publish
          </Button>
          <Button className={buttonStyles} onClick={handleSend}>
            Publish & Send by Email
          </Button>
        </div>
        <EmailForm
          fileName={filename}
          location={location}
          imageUrl={imageUrl}
          isSending={isSending}
        />
      </div>
    </>
  );
};

export default SaveAndSend;
