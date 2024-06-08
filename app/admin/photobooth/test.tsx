"use client";

import React, { useRef, useEffect, useCallback, FC, useState } from "react";
import Webcam from "react-webcam";
import { useBoothContext } from "./BoothContext";
import { saveImage } from "../actions";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../ui/button";

function applyTintEffect(uint8Array: Uint8Array): Uint8Array {
  const startColor = { r: 0, g: 0, b: 0 }; // Black
  const endColor = { r: 64, g: 224, b: 208 }; // Turquoise

  for (let i = 0; i < uint8Array.length; i += 4) {
    const r = uint8Array[i];
    const g = uint8Array[i + 1];
    const b = uint8Array[i + 2];
    const brightnessValue = (r + g + b) / 3;

    const t = brightnessValue / 255;
    const interColor = {
      r: startColor.r * (1 - t) + endColor.r * t,
      g: startColor.g * (1 - t) + endColor.g * t,
      b: startColor.b * (1 - t) + endColor.b * t,
    };

    uint8Array[i] = interColor.r;
    uint8Array[i + 1] = interColor.g;
    uint8Array[i + 2] = interColor.b;
  }

  return new Uint8Array(uint8Array.buffer);
}

const MakePhoto: FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [isStreamReady, setIsStreamReady] = useState(false);
  const {
    statement,
    setStatement,
    stage,
    setStage,
    currentLang,
    windowHeight,
    windowWidth,
    userName,
    location,
    setFilename,
  } = useBoothContext();
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const frameRate = 10;
  const videoConstraints = {
    width: windowWidth / 4,
    height: windowHeight / 4,
    facingMode: "user",
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getScreenshot = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.toBlob(async (blob) => {
        const filename = "poster_" + uuidv4() + "_" + location + ".jpeg";
        if (blob) {
          const formData = new FormData();
          formData.append("blob", blob);
          formData.append("fileName", filename);

          const result = await saveImage(formData);
          if (result.success) {
            console.log("Image uploaded successfully");
          } else {
            console.error("Failed to upload image");
          }
        }
      }, "image/jpeg");
      setStage(4);
    }
  }, [canvasRef, location, setStage]);

  // const handleDataAvailable = useCallback(
  const handleDataAvailable = async (event: BlobEvent) => {
    console.log("DATA AVAILABLE");

    const blobStream = event.data.stream();
    const transformStream = new TransformStream({
      start() {},
      async transform(
        chunk: Uint8Array,
        controller: TransformStreamDefaultController,
      ) {
        chunk = chunk;
        const aplliedArray = applyTintEffect(chunk);
        controller.enqueue(aplliedArray);
      },
    });

    const transformedStream = blobStream.pipeThrough(transformStream);
    const reader = transformedStream.getReader();
    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx) {
      console.error("Failed to get 2D context");
      return;
    }

    const readAndProcessFrame = async () => {
      const { done, value } = await reader.read();
      if (done) return;

      if (canvasRef.current) {
        console.log("Processing frame", value);

        const imageData = new ImageData(
          new Uint8ClampedArray(value.buffer),
          canvasRef.current.width,
          canvasRef.current.height,
        );
        ctx.putImageData(imageData, 0, 0);
      }

      readAndProcessFrame();
    };
    readAndProcessFrame();
  };
  //   [canvasRef, webcamRef, isStreamReady],
  // );

  useEffect(() => {
    if (isStreamReady && webcamRef.current?.stream?.active) {
      // console.dir(webcamRef.current?.stream);
      console.log("start");
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream!);
      // mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream!, {
      //   mimeType: "video/webm",
      // });

      console.log(`mime: ${mediaRecorderRef.current.mimeType}`);

      mediaRecorderRef.current.addEventListener(
        "error",
        () => console.error("recorder error"),
        // false,
      );

      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable,
        false,
      );

      mediaRecorderRef.current.start(10);
      console.dir(mediaRecorderRef.current.ondataavailable);
      console.dir(mediaRecorderRef.current.onerror);
    }

    // return () => {
    //   if (intervalId.current) {
    //     clearInterval(intervalId.current);
    //   }
    // };
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isStreamReady, handleDataAvailable]);

  if (stage !== 3) return null;

  return (
    <div className="flex w-full flex-col items-center">
      <Webcam
        audio={false}
        // width={windowWidth / 2}
        // height={windowHeight / 2 - 100}
        videoConstraints={videoConstraints}
        ref={webcamRef}
        onLoadedMetadata={() => {
          const { videoWidth, videoHeight } = webcamRef.current!.video!;
          console.log(`Video dimensions: ${videoWidth}x${videoHeight}`);
          if (canvasRef.current) {
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
            console.log("Canvas dimensions set", { videoHeight, videoWidth });
          } else {
            console.error("Canvas ref is not available");
          }
          setIsStreamReady(true);
        }}
        // style={{ display: "none" }} // Hide the video element
      />
      <canvas ref={canvasRef} style={{ border: "1px solid black" }}></canvas>
      <Button onClick={getScreenshot}>Capture photo</Button>
    </div>
  );
};

export default MakePhoto;
