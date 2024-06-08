"use client";
import React, { useRef, useEffect, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { v4 as uuidv4 } from "uuid";
import { useBoothContext } from "./BoothContext";
import { saveImage } from "../actions";
import { Button } from "../../ui/button";
import { editButton } from "../classNames";

const VideoWithFilters = () => {
  const [isStreamReady, setIsStreaming] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    filename,
    setFilename,
  } = useBoothContext();

  const videoConstraints = {
    width: windowWidth,
    height: windowHeight * 0.9,
    facingMode: "user",
    frameRate: 20,
  };

  const applyTintEffect = useCallback(
    (
      context: CanvasRenderingContext2D | null,
      width: number,
      height: number,
    ) => {
      if (!context) return;
      const imageData = context.getImageData(0, 0, width, height);
      const data = imageData.data;
      const startColor = { r: 0, g: 0, b: 0 }; // Black
      const endColor = { r: 64, g: 224, b: 208 }; // Turquoise

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightnessValue = (r + g + b) / 3;

        const t = brightnessValue / 255;
        const interColor = {
          r: startColor.r * (1 - t) + endColor.r * t,
          g: startColor.g * (1 - t) + endColor.g * t,
          b: startColor.b * (1 - t) + endColor.b * t,
        };

        data[i] = interColor.r;
        data[i + 1] = interColor.g;
        data[i + 2] = interColor.b;
      }

      context.putImageData(imageData, 0, 0);
    },
    [canvasRef, isStreamReady, windowWidth, windowHeight],
  );

  const getScreenshot = useCallback(() => {
    if (canvasRef.current) {
      const targetCanvas = canvasRef.current;
      const targetContext = targetCanvas.getContext("2d");

      if (webcamRef.current) {
        const sourceCanvas = webcamRef.current.getCanvas();

        if (sourceCanvas) {
          targetCanvas.width = windowWidth;
          targetCanvas.height = windowHeight * 0.9;

          targetContext?.drawImage(
            sourceCanvas,
            0,
            0,
            windowWidth,
            windowHeight * 0.9,
          );

          applyTintEffect(targetContext, windowWidth, windowHeight * 0.9);

          targetCanvas.toBlob(async (blob) => {
            const filename = "poster_" + uuidv4() + "_" + location + ".jpeg";
            setFilename(filename);
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
      }
    }
  }, [canvasRef, location, setStage, windowWidth, windowHeight]);

  const capture = useCallback(() => {
    const webcam = webcamRef.current;
    if (webcam && isStreamReady) {
      const sourceCanvas = webcam.getCanvas();
      if (sourceCanvas) {
        const context = sourceCanvas.getContext("2d");
        const targetCanvas = canvasRef.current;
        const targetContext = targetCanvas?.getContext("2d");

        targetCanvas!.width = windowWidth;
        targetCanvas!.height = windowHeight * 0.9;

        targetContext?.drawImage(
          sourceCanvas,
          0,
          0,
          windowWidth,
          windowHeight * 0.9,
        );

        requestAnimationFrame(capture);
      }
    }
  }, [isStreamReady, windowWidth, windowHeight]);

  useEffect(() => {
    capture();
  }, [capture]);

  if (stage !== 3) return null;

  return (
    <div className="relative flex flex-col items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{ position: "absolute" }}
        onLoadedMetadata={() => {
          setIsStreaming(true);
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: videoConstraints.width,
          height: videoConstraints.height,
          filter: `hue-rotate(140deg) saturate(1) brightness(0.8)`,
        }}
      ></canvas>
      <Button className={`${editButton} mt-10`} onClick={getScreenshot}>
        Capture photo
      </Button>
    </div>
  );
};

export default VideoWithFilters;
