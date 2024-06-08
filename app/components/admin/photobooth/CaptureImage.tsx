"use client";

import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import { v4 as uuidv4 } from "uuid";
// const p5 = require("p5");

import {
  languages,
  turquoise,
  black,
  darkRed,
  yellowBrown,
  pink,
  P,
  Params,
} from "@/lib/photobooth/const";
import { DavButton } from "@/lib/photobooth/Button";
import { saveImage } from "@/components/admin/actions";
import { BackButton } from "@/lib/photobooth/BackButton";
import { useBoothContext } from "./BoothContext";

type TextData = {
  textLinesData: {
    text: string;
    width: number;
    y: number;
  }[];
};

const Photobooth: React.FC = () => {
  const processingRef = useRef<HTMLDivElement | null>(null);
  const p5InstanceRef = useRef<P | null>(null);

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

  const [isCapturing, setIsCapturing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isRerouting, setIsRerouting] = useState(false);

  // const [localStage, setLocalStage] = useState(6);

  useEffect(() => {
    const createSketch = (p: P) => {
      let capture: any;

      let archivoBold: p5.Font;
      let openBold: p5.Font;

      let lang = 0;

      let textData: TextData = {
        textLinesData: [
          { text: statement ?? "", y: 100, width: statement ? 500 : 0 },
        ],
      };

      let a1: number;
      let a2: number;
      let a3: number;
      let r: number;

      let t = 0;
      let wait = 0;
      let langT = 0;
      let countDownTxt = 3;
      let capturedImage: p5.Image | null = null;
      let yb = 0;

      let scaleFactor;
      let posY;
      let posX;
      let backButton: BackButton;

      let nextButton: DavButton;
      let repeatButton: DavButton;
      let pictureButton: DavButton;
      let startButton: DavButton;
      let finishButton: DavButton;

      let allButtons: DavButton[] = [];

      let VIDEO: p5.TYPE;

      const params: Params = {
        stage: 6,
      };

      p.preload = () => {
        archivoBold = p.loadFont("/fonts/Archivo-Bold.ttf");
        openBold = p.loadFont("/fonts/OpenSans-Bold.ttf");
        console.log("preload");
      };

      p.setup = () => {
        if (stage !== 3) {
          capturedImage = null;
          capture.remove();
          return;
        }
        p.createCanvas(windowWidth - 5, windowHeight - 5);

        let cnv = document.querySelector("canvas");
        if (cnv) {
          cnv.getContext("2d", {
            willReadFrequently: true,
          });
        }
        p.frameRate(18);

        p.textFont(archivoBold);
        yb = p.height * 2;

        a1 = p.PI;
        a2 = a1 + (p.TWO_PI * 1) / 3;
        a3 = a2 + (p.TWO_PI * 1) / 3;
        r = 80;

        nextButton = new DavButton(
          "Next",
          p.width / 2 - 200 / 2,
          p.height / 2,
          200,
          9,
          // params,
          // setLocalStage,
          p,
        );
        // finishButton = new DavButton(
        //   "Finish",
        //   p.width / 2 - 240 / 2,
        //   (5 * p.height) / 6,
        //   240,
        //   ,
        // 	setLocalStage
        //   p,
        // );
        repeatButton = new DavButton(
          "Repeat picture",
          p.width / 2 - 400 / 2,
          (2 * p.height) / 3,
          400,
          5,
          // params,
          p,
        );
        pictureButton = new DavButton(
          "Take a picture",
          p.width / 2 - 400 / 2,
          (5 * p.height) / 6,
          400,
          7,
          // params,
          p,
        );
        // startButton = new DavButton(
        //   "Start",
        //   p.width / 2 - 200 / 2,
        //   (2 * p.height) / 3,
        //   200,
        //   null,
        // 	params,
        //   p,
        // );

        allButtons.push(
          nextButton,
          // finishButton,
          repeatButton,
          pictureButton,
          // startButton,
        );

        backButton = new BackButton(p);

        const buttonWidth = 120;
        const buttonHeight = 50;
        const buttonSpacing = 20;

        let startX = (p.width - buttonWidth) / 2;
        let startY =
          (p.height -
            (buttonHeight * languages.length +
              buttonSpacing * (languages.length - 1))) /
          2;

        capture = p.createCapture(VIDEO) as any;
        capture.size(640, 480);
        capture.hide();
        console.log("setup");
      };

      p.draw = () => {
        if (wait > 0) {
          wait--;
        }

        p.background(turquoise);
        if (params.stage == 5) {
          capturedImage = null;
          capture = p.createCapture(VIDEO) as any;
          capture.size(640, 480);
          capture.hide();
          params.stage = 6;
        } else if (params.stage == 6 || params.stage == 7) {
          capture.loadPixels({
            willReadFrequently: true,
          });
          applyTintEffect(capture);
          capture.updatePixels();

          let scaleWidth = p.windowWidth / capture.width;
          let scaleHeight = p.windowHeight / capture.height;

          scaleFactor = p.max(scaleWidth, scaleHeight);

          posY = (p.windowHeight - capture.height * scaleFactor) / 2;

          p.push();
          p.translate(p.windowWidth / 2, p.windowHeight / 2);
          p.scale(-1 * scaleFactor, scaleFactor); // Odbicie lustrzane i skalowanie
          p.image(capture, -capture.width / 2, -capture.height / 2);
          p.pop();

          if (params.stage == 6) {
            pictureButton.display(pink, darkRed, p, currentLang);
            countDownTxt = 3;
          } else {
            countDown();
          }
        } else if (params.stage == 8) {
          capture.remove();
          if (capturedImage) p.image(capturedImage, 0, 0);
          p.push(); // Start a new drawing state
          p.stroke(darkRed);
          p.strokeWeight(90);

          let lineHeight = p.textAscent() + p.textDescent();
          let spacing = 80; // Custom spacing between lines

          // Handling multiple lines based on 'enter' character in displayText
          let yPos = 80;

          // Draw all underlines from saved data
          textData.textLinesData.forEach((textLineData) => {
            let startX = p.width;
            let endX = p.width - 100 - textLineData.width;
            p.stroke(darkRed);
            p.strokeWeight(90);
            p.line(
              startX,
              textLineData.y + lineHeight - 16,
              endX,
              textLineData.y + lineHeight - 16,
            ); // Adjust y position for underline
            p.noStroke();
            p.fill(yellowBrown);
            p.triangle(
              endX - r / 2 + p.cos(a1) * r,
              textLineData.y + lineHeight - 16 + p.sin(a1) * r,
              endX - r / 2 + p.cos(a2) * r,
              textLineData.y + lineHeight - 16 + p.sin(a2) * r,
              endX - r / 2 + p.cos(a3) * r,
              textLineData.y + lineHeight - 16 + p.sin(a3) * r,
            );
          });

          // Draw all text lines from saved data
          p.fill(pink);
          p.textSize(36);
          p.textAlign(p.RIGHT, p.TOP);
          p.noStroke();

          textData.textLinesData.forEach((textLineData) => {
            p.text(
              textLineData.text,
              40,
              textLineData.y - 8,
              p.width - 80,
              p.height / 8,
            );

            // Increment yPos for the next line
            yPos = textLineData.y + lineHeight + spacing; // Keep track of the last y position
          });

          p.textSize(70);
          p.fill(darkRed);
          p.text(userName ?? "", 40, yPos, p.width - 80, p.height / 4);
          p.pop();
          nextButton.display(pink, darkRed, p, currentLang);

          repeatButton.display(pink, darkRed, p, currentLang);
        } else if (params.stage == 9) {
          if (!isSending && !isRerouting) {
            setIsSending(true);
            console.log({ isSending });
            if (capturedImage) p.image(capturedImage, 0, 0);
            p.push(); // Start a new drawing state
            p.stroke(darkRed);
            p.strokeWeight(90);

            let lineHeight = p.textAscent() + p.textDescent();
            let spacing = 80; // Custom spacing between lines

            let yPos = 80;

            // Draw all underlines from saved data
            textData.textLinesData.forEach((textLineData) => {
              let startX = p.width;
              let endX = p.width - 100 - textLineData.width;
              p.stroke(darkRed);
              p.strokeWeight(90);
              p.line(
                startX,
                textLineData.y + lineHeight - 16,
                endX,
                textLineData.y + lineHeight - 16,
              ); // Adjust y position for underline
              p.noStroke();
              p.fill(yellowBrown);
              p.triangle(
                endX - r / 2 + p.cos(a1) * r,
                textLineData.y + lineHeight - 16 + p.sin(a1) * r,
                endX - r / 2 + p.cos(a2) * r,
                textLineData.y + lineHeight - 16 + p.sin(a2) * r,
                endX - r / 2 + p.cos(a3) * r,
                textLineData.y + lineHeight - 16 + p.sin(a3) * r,
              );
            });

            // Draw all text lines from saved data
            p.fill(pink);
            p.textSize(36);
            p.textAlign(p.RIGHT, p.TOP);
            p.noStroke();

            textData.textLinesData.forEach((textLineData) => {
              p.text(
                textLineData.text,
                40,
                textLineData.y - 8,
                p.width - 80,
                p.height / 8,
              );

              // Increment yPos for the next line
              yPos = textLineData.y + lineHeight + spacing; // Keep track of the last y position
            });

            p.textSize(70);
            p.fill(darkRed);
            p.text(userName ?? "", 40, yPos, p.width - 80, p.height / 4);
            p.pop();

            // upload image to storage
            let cnv = document.querySelector("canvas");

            if (cnv) {
              cnv.getContext("2d", {
                willReadFrequently: true,
              });
              const name = "poster_" + uuidv4() + "_" + location + ".jpeg";
              cnv.toBlob(
                (blob) => {
                  if (blob) {
                    const formData = new FormData();
                    formData.append("blob", blob);
                    formData.append("fileName", name);
                    saveImage(formData);
                    setFilename(name);

                    // Remove captured image from memory
                    capturedImage = null;
                    setIsRerouting(true);
                    setStage(4);
                  }
                },
                "image/jpeg",
                1,
              );
              params.stage = 10;
            }
          }
        } else if (params.stage == 10) {
        }
      };

      function countDown() {
        if (countDownTxt == 2) {
          capturedImage = null;
        }
        if (countDownTxt == 0) {
          capturedImage = p.get();
          capture.stop();
          applyTintEffect(capturedImage);
          params.stage = 8;
        } else {
          p.push();
          p.noStroke();
          p.textFont(archivoBold);
          p.fill(184, 82, 82, 255 - langT); //darkRed
          p.circle(p.width / 2, 200, 200);
          p.fill(231, 216, 221, 255 - langT); //pink
          p.textSize(100);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(countDownTxt, p.width / 2, 190);
          p.pop();
          langT += 30;
          if (langT > 255) {
            langT = 0;
            countDownTxt--;
          }
        }
      }

      function applyTintEffect(img: p5.Image) {
        let startColor = p.color(black); // Dark
        let endColor = p.color(turquoise); // Light
        for (let y = 0; y < capture.height; y++) {
          for (let x = 0; x < capture.width; x++) {
            let index = (x + y * capture.width) * 4;
            let brightnessValue =
              (capture.pixels[index] +
                capture.pixels[index + 1] +
                capture.pixels[index + 2]) /
              3;
            let t = p.map(brightnessValue, 0, 255, 0, 1);
            let interColor = p.lerpColor(startColor, endColor, t);
            capture.pixels[index] = p.red(interColor);
            capture.pixels[index + 1] = p.green(interColor);
            capture.pixels[index + 2] = p.blue(interColor);
          }
        }
      }

      p.mousePressed = () => {
        if (wait == 0) {
          allButtons.forEach((button) => {
            if (button.isClicked(p.mouseX, p.mouseY)) {
              button.handleClick(params);
            }
          });
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth - 5, p.windowHeight - 5);
      };
    };

    if (stage === 3 && processingRef.current) {
      if (!p5InstanceRef.current) {
        p5InstanceRef.current = new p5(createSketch, processingRef.current);
      }
    }

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [stage, location, isCapturing, isSending]);

  if (stage !== 3) {
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
    }
    p5InstanceRef.current = null;
    return null;
  }
  // console.log({ localStage }, "AFTER");
  return (
    <>
      <div className="l-h-animation" ref={processingRef}></div>
    </>
  );
};

export default Photobooth;
