"use client";
import React, { useRef, useEffect, useCallback, useState, FC } from "react";
import Webcam from "react-webcam";
import { v4 as uuidv4 } from "uuid";
import { useBoothContext } from "./BoothContext";
import { saveImage } from "../actions";
import { Button } from "../../ui/button";
import { editButton } from "../classNames";

const VideoWithFilters: FC = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    statements,
    stage,
    setStage,
    currentLang,
    windowHeight,
    windowWidth,
    userName,
    location,
    filename,
    setFilename,
    font,
  } = useBoothContext();

  useEffect(() => {
    setCanvasWidth(windowWidth);
    setCanvasHeight(windowHeight * 0.9);
  }, [windowWidth, windowHeight]);

  const drawStatements = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      statements: string[] | null,
      fontSize: number,
    ) => {
      statements?.forEach((statement, idx) => {
        if (!statement) return;

        const padding = 16;
        ctx.font = `${fontSize}px ${font.fontFamily}`;
        ctx.textBaseline = "top";

        const statementWidth = ctx.measureText(statement).width;

        const textHeight = fontSize * 1.2;

        const offset = (idx + 1) * (textHeight + 60);

        // Calculate positions
        // const rectX = canvasWidth - (padding + statementWidth);
        const rectX = canvasWidth - statementWidth - 2 * padding;
        const rectY = offset - padding;
        const text1X = canvasWidth - statementWidth - padding;
        const text1Y = rectY + padding;

        // Draw background rectangle
        ctx.fillStyle = "rgba(184, 82, 82, 1)"; // Background color with transparency
        ctx.fillRect(
          rectX,
          rectY,
          statementWidth + padding * 2,
          textHeight + padding * 2,
        );

        ctx.fillStyle = "rgba(207, 152, 85, 1)";
        ctx.fill;

        drawTriangle({
          ctx,
          endX: rectX,
          startY: rectY + (textHeight + padding * 2) / 2,
        });

        // Draw text
        ctx.fillStyle = "white"; // Text color
        ctx.fillText(statement, text1X, text1Y + 5);
      });
    },
    [statements],
  );

  const drawUserName = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      userName: string | null,
      fontSize: number,
      offsetMultiplier: number,
    ) => {
      if (!userName) return;

      ctx.font = `${fontSize}px ${font.fontFamily}`;
      ctx.textBaseline = "top";

      const textWidth = userName ? ctx.measureText(userName).width : 0;

      const textY = (offsetMultiplier + 1) * 105;
      const padding = 16;
      const textX = canvasWidth - textWidth - padding;

      // Draw text
      ctx.fillStyle = "rgba(184, 82, 82, 1)"; // Text color
      if (userName) ctx.fillText(userName, textX, textY);
    },
    [userName],
  );

  const drawTriangle = useCallback(
    ({
      ctx,
      endX,
      startY,
    }: {
      ctx: CanvasRenderingContext2D;
      endX: number;
      startY: number;
    }) => {
      const yellowBrown = "#cf9855"; // Color value for yellowBrown
      const r = 70; // Radius value
      const a1 = Math.PI; // Angle in radians
      const a2 = a1 + (Math.PI * 2) / 3; // Angle in radians
      const a3 = a2 + (Math.PI * 2) / 3; // Angle in radians

      ctx.fillStyle = yellowBrown;

      const x1 = endX - r / 2 + Math.cos(a1) * r;
      const y1 = startY + Math.sin(a1) * r;
      const x2 = endX - r / 2 + Math.cos(a2) * r;
      const y2 = startY + Math.sin(a2) * r;
      const x3 = endX - r / 2 + Math.cos(a3) * r;
      const y3 = startY + Math.sin(a3) * r;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.closePath();
      ctx.fill();
    },
    [],
  );

  const applyTintEffect = useCallback(
    (ctx: CanvasRenderingContext2D | null, width: number, height: number) => {
      if (!ctx) return;
      const imageData = ctx.getImageData(0, 0, width, height);
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

      ctx.putImageData(imageData, 0, 0);
    },
    [],
  );

  const makePhoto = () => {
    if (!canvasRef.current || !webcamRef.current) return;
    setSaving(true);
    const targetCanvas = canvasRef.current;
    const targetCtx = targetCanvas.getContext("2d");
    const sourceCanvas = webcamRef.current.getCanvas();
    const statementFontSize = 36;
    const userFontSize = 70;

    if (sourceCanvas && targetCtx) {
      targetCanvas.width = canvasWidth;
      targetCanvas.height = canvasHeight;

      targetCtx?.drawImage(sourceCanvas, 0, 0, canvasWidth, canvasHeight);

      applyTintEffect(targetCtx, canvasWidth, canvasHeight);

      drawUserName(targetCtx, userName, userFontSize, statements?.length ?? 0);
      drawStatements(targetCtx, statements, statementFontSize);

      targetCanvas.toBlob(async (blob) => {
        const filename = "poster_" + uuidv4() + "_" + location + ".jpeg";
        setFilename(filename);
        if (blob) {
          const formData = new FormData();
          formData.append("blob", blob);
          formData.append("fileName", filename);

          const result = await saveImage(formData);
          setSaving(false);
          if (result.error) {
            throw new Error("Failed to save image");
          }
          setStage(4);
        }
      }, "image/jpeg");
    }
  };
  //TODO add take another picture step (without loosing statement etc)

  if (stage !== 3) {
    canvasRef.current?.remove();
    return null;
  }

  return (
    <div className="relative flex h-screen w-screen flex-col items-center bg-black_bg">
      {!canvasHeight || !canvasWidth ? (
        <p>Loading....</p>
      ) : (
        <>
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
            style={{
              width: canvasWidth,
              height: canvasHeight,
              // filter: `hue-rotate(140deg) saturate(.7) brightness(0.8)`,
            }}
            onUserMedia={() => setIsStreaming(true)}
          />
          <Button className={`${editButton} my-5`} onClick={makePhoto}>
            Take Picture
          </Button>
        </>
      )}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: canvasWidth,
          height: canvasHeight,
          zIndex: -1,
        }}
      ></canvas>
    </div>
  );
};

export default VideoWithFilters;
