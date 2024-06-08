"use client";
import React, { useRef, useEffect, useCallback, useState, FC } from "react";
import Webcam from "react-webcam";
import { v4 as uuidv4 } from "uuid";
import { useBoothContext } from "./BoothContext";
import { saveImage } from "../actions";
import { Button } from "../../ui/button";
import { editButton } from "../classNames";

const VideoWithFilters: FC = () => {
  const [isStreamReady, setIsStreaming] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
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

  useEffect(() => {
    setCanvasWidth(windowWidth);
    setCanvasHeight(windowHeight * 0.9);
    console.log({ windowWidth, windowHeight });
  }, [windowWidth, windowHeight]);

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
    [canvasRef, isStreamReady, canvasWidth, windowHeight],
  );

  const drawText = useCallback(
    (
      context: CanvasRenderingContext2D | null,
      width: number,
      height: number,
    ) => {
      if (!context || !userName || !statement) return;
      const text1 = userName;
      const text2 = statement;
      const fontSize = 20;
      const padding = 10;

      context.font = `${fontSize}px Arial`;
      context.textBaseline = "top";

      const text1Width = context.measureText(text1).width;
      const text2Width = context.measureText(text2).width;
      const maxTextWidth = Math.max(text1Width, text2Width);
      const textHeight = fontSize * 1.2;

      // Calculate positions
      const rectX = (width - maxTextWidth) / 2 - padding;
      const rectY = (height - textHeight * 2) / 2 - padding;
      const text1X = (width - text1Width) / 2;
      const text1Y = rectY + padding;
      const text2X = (width - text2Width) / 2;
      const text2Y = text1Y + textHeight;

      // Draw background rectangle
      context.fillStyle = "rgba(0, 0, 0, 0.7)"; // Background color with transparency
      context.fillRect(
        rectX,
        rectY,
        maxTextWidth + padding * 2,
        textHeight * 2 + padding * 2,
      );

      // Draw text
      context.fillStyle = "white"; // Text color
      context.fillText(text1, text1X, text1Y);
      context.fillText(text2, text2X, text2Y);
    },
    [userName, statement],
  );

  const getScreenshot = useCallback(() => {
    if (canvasRef.current) {
      const targetCanvas = canvasRef.current;
      const targetContext = targetCanvas.getContext("2d");

      if (webcamRef.current) {
        const sourceCanvas = webcamRef.current.getCanvas();

        if (sourceCanvas) {
          targetCanvas.width = canvasWidth;
          targetCanvas.height = canvasHeight;

          targetContext?.drawImage(
            sourceCanvas,
            0,
            0,
            canvasWidth,
            canvasHeight,
          );

          applyTintEffect(targetContext, canvasWidth, canvasHeight);

          drawText(targetContext, canvasWidth, canvasHeight);

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
  }, [canvasRef, location, setStage, canvasWidth, canvasHeight]);

  const capture = useCallback(() => {
    const webcam = webcamRef.current;
    if (webcam && isStreamReady) {
      const sourceCanvas = webcam.getCanvas();
      if (sourceCanvas) {
        const context = sourceCanvas.getContext("2d");
        const targetCanvas = canvasRef.current;
        const targetContext = targetCanvas?.getContext("2d");

        targetCanvas!.width = canvasWidth;
        targetCanvas!.height = canvasHeight;

        targetContext?.drawImage(sourceCanvas, 0, 0, canvasWidth, canvasHeight);

        requestAnimationFrame(capture);
      }
    }
  }, [isStreamReady, canvasWidth, canvasHeight]);

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
        videoConstraints={{
          width: canvasWidth,
          height: canvasHeight,
          facingMode: "user",
          frameRate: 20,
        }}
        style={{ position: "absolute" }}
        onLoadedMetadata={() => {
          setIsStreaming(true);
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: canvasWidth,
          height: canvasHeight,
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
