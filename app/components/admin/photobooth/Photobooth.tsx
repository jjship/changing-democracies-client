"use client";

import React, { useRef, useEffect, useContext, useState } from "react";
import { Font, Image, TYPE, Renderer } from "p5";

import {
  languageAbbreviations,
  languages,
  turquoise,
  black,
  darkRed,
  yellowBrown,
  pink,
  altLayouts,
  layouts,
  translations,
  INACTIVITY_THRESHOLD,
  violet,
  Language,
  Translations,
  getTranslation,
  Layouts,
  grey,
  darkGrey,
  P,
} from "@/lib/photobooth/const";
import { BtnLang } from "@/lib/photobooth/BtnLang";
import { DavButton } from "@/lib/photobooth/Button";
import { Key } from "@/lib/photobooth/Key";
import { saveImage } from "@/components/admin/actions";

type TextData = {
  textLinesData: {
    text: string;
    width: number;
    y: number;
  }[];
  statement: string;
};

type UnderlineData = {
  startX: number;
  endX: number;
  y: number;
};

const Photobooth = () => {
  // const [currLang, setCurrLang] = useState<Language>("english");
  // const [stage, setStage] = useState<number>(-1);

  const processingRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const p5 = require("p5");
    // let newp5;
    if (processingRef.current) {
      new p5((p: P) => {
        let capture: any;

        let mPressed = false;

        let languageButtons: BtnLang[] = [];

        let keys: Key[] = [];
        let currentLayout: Language;
        // let currentLayout: Language = currLang;
        let currentText = "";
        let capsLock = false;
        let displayText = "";
        let altPressed = false;

        let lastActivityTime: number;

        let posterIndex = 0;

        let userName = "";

        let archivoBold: Font;
        let openBold: Font;

        let lang = 0;

        let textData: TextData = {
          textLinesData: [],
          statement: "",
        };

        let a1: number;
        let a2: number;
        let a3: number;
        let r: number;

        let t = 0;
        let wait = 0;
        let langT = 0;
        let countDownTxt = 0;
        let capturedImage: Image;
        let yb = 0;
        let ybc = 0;
        let easing = 0.09;
        let displayLangText = false;

        let scaleFactor;
        let posY;
        let posX;

        let stage = -1;

        let nextButton: DavButton;
        let repeatButton: DavButton;
        let pictureButton: DavButton;
        let startButton: DavButton;
        let finishButton: DavButton;

        let VIDEO: TYPE;

        p.preload = () => {
          archivoBold = p.loadFont("/fonts/Archivo-Bold.ttf");
          openBold = p.loadFont("/fonts/OpenSans-Bold.ttf");
        };

        p.setup = () => {
          p.createCanvas(p.windowWidth - 5, p.windowHeight - 5);

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
            null,
            p,
          );
          finishButton = new DavButton(
            "Finish",
            p.width / 2 - 240 / 2,
            (5 * p.height) / 6,
            240,
            null,
            p,
          );
          repeatButton = new DavButton(
            "Repeat picture",
            p.width / 2 - 400 / 2,
            (2 * p.height) / 3,
            400,
            5,
            p,
          );
          pictureButton = new DavButton(
            "Take a picture",
            p.width / 2 - 400 / 2,
            (5 * p.height) / 6,
            400,
            null,
            p,
          );
          startButton = new DavButton(
            "Start",
            p.width / 2 - 200 / 2,
            (2 * p.height) / 3,
            200,
            null,
            p,
          );

          const buttonWidth = 120;
          const buttonHeight = 50;
          const buttonSpacing = 20;

          let startX = (p.width - buttonWidth) / 2;
          let startY =
            (p.height -
              (buttonHeight * languages.length +
                buttonSpacing * (languages.length - 1))) /
            2;

          for (let i = 0; i < languages.length; i++) {
            let language = languages[i];
            let btnY = startY + i * (buttonHeight + buttonSpacing);
            languageButtons.push(
              new BtnLang(language, startX, btnY, buttonWidth, p),
            );
          }
        };

        p.draw = () => {
          // console.log({ stage });
          if (wait > 0) {
            wait--;
          }
          const change = checkUserActivity();
          if (change) {
            stage = change;
          }
          p.background(turquoise);

          if (stage == -1) {
            languageButtons.forEach((button) => {
              const { pressed, newStage, newLang } = button.display(
                pink,
                darkRed,
                mPressed,
                p,
                currentLayout,
                stage,
                languageAbbreviations,
                archivoBold,
                // setCurrLang,
                // setStage,
              );
              if (pressed) {
                stage = newStage;
                currentLayout = newLang;
              }
            });
          } else if (stage == 0) {
            userName = ""; // Clear userName
            displayText = "";
            currentText = "";
            textData = { textLinesData: [], statement: "" }; // Reset textData

            altPressed = false;
            capsLock = false;
            p.push();
            p.fill(black);
            p.noStroke();
            p.textSize(24);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(
              getTranslation(
                currentLayout,
                "Make your own poster",
                translations,
              ),
              p.width / 2,
              p.height / 8,
            );

            p.fill(darkRed);
            p.textSize(32);
            p.text(
              getTranslation(
                currentLayout,
                "Express your feelings about Democracy",
                translations,
              ),
              p.width / 2,
              p.height / 2,
            );
            p.pop();
            const { pressed, newStage, newLang } = startButton.display(
              pink,
              darkRed,
              mPressed,
              p,
              stage,
              currentLayout,
            );
            if (pressed) {
              console.log({ pressed, newLang, newStage });
              stage = newStage;
              currentLayout = newLang;
            }
          } else if (stage == 1) {
            t = 2;
            stage = 2;
            // setStage(2);

            updateKeys(currentLayout);
          } else if (stage == 2) {
            if (displayLangText) {
              displayLang();
            }

            if (t > 0) {
              currentText = currentText.substring(0, currentText.length - 1);
              t--;
            }
            p.push();
            p.fill(black);
            p.noStroke();
            p.textSize(24);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(
              getTranslation(currentLayout, "What is your name?", translations),
              p.width / 2,
              p.height / 8,
            );
            p.textSize(36);
            p.fill(darkRed);
            p.textAlign(p.CENTER, p.TOP);
            p.text(displayText, p.width / 2, p.height / 4);
            p.pop();
            const { pressed, newStage, newLang } = nextButton.display(
              pink,
              darkRed,
              mPressed,
              p,
              stage,
              currentLayout,
            );

            if (pressed) {
              console.log({ pressed, newLang, newStage });
              stage = newStage;
              currentLayout = newLang;
            }

            keys.forEach((key) => {
              key.display(
                grey,
                darkGrey,
                black,
                openBold,
                archivoBold,
                altPressed,
                capsLock,
                currentLayout,
                p,
              );
            });
          } else if (stage == 3) {
            userName = displayText;
            displayText = "";
            currentText = "";
            stage = 4;
            // setStage(4);
          } else if (stage == 4) {
            if (displayLangText) {
              displayLang();
            }

            p.push(); // Start a new drawing state
            p.noStroke();
            p.textSize(36);
            p.textAlign(p.RIGHT, p.TOP);

            let lineHeight = p.textAscent() + p.textDescent();
            let spacing = 80; // Custom spacing between lines

            let textLines = displayText.split("\n");
            let yPos = 80;
            let underlineData: UnderlineData[] = [];

            textData.textLinesData = []; // Clear previous data

            textLines.forEach((textLine, index) => {
              let textLineWidth = p.textWidth(textLine);
              underlineData.push({
                startX: p.width,
                endX: p.width - 100 - textLineWidth,
                y: yPos + lineHeight,
              });

              // Store each line's data
              textData.textLinesData.push({
                text: textLine,
                width: textLineWidth,
                y: yPos,
              });

              yPos += lineHeight + spacing;
            });

            // Store the complete statement
            textData.statement = displayText;

            // Draw all underlines

            underlineData.forEach((underlineItem) => {
              p.push();
              p.stroke(darkRed);
              p.strokeWeight(90);
              p.line(
                underlineItem.startX,
                underlineItem.y,
                underlineItem.endX,
                underlineItem.y,
              );
              p.noStroke();
              p.fill(yellowBrown);
              p.triangle(
                underlineItem.endX - r / 2 + p.cos(a1) * r,
                underlineItem.y + p.sin(a1) * r,
                underlineItem.endX - r / 2 + p.cos(a2) * r,
                underlineItem.y + p.sin(a2) * r,
                underlineItem.endX - r / 2 + p.cos(a3) * r,
                underlineItem.y + p.sin(a3) * r,
              );
              p.pop();
            });

            // Draw all text lines
            p.fill(pink);
            p.noStroke();
            textData.textLinesData.forEach((textLineData) => {
              p.text(
                textLineData.text,
                40,
                textLineData.y + 16,
                p.width - 80,
                p.height / 8,
              );
            });

            p.pop(); // Restore original drawing state

            p.fill(black);
            p.textSize(24);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(
              getTranslation(
                currentLayout,
                "Write your statement",
                translations,
              ),
              p.width / 2,
              p.height / 4,
            );

            const { pressed, newStage, newLang } = nextButton.display(
              pink,
              darkRed,
              mPressed,
              p,
              stage,
              currentLayout,
            );

            if (pressed) {
              console.log({ pressed, newLang, newStage });
              stage = newStage;
              currentLayout = newLang;
            }

            keys.forEach((key) => {
              key.display(
                grey,
                darkGrey,
                black,
                openBold,
                archivoBold,
                altPressed,
                capsLock,
                currentLayout,
                p,
              );
            });

            // ...
          } else if (stage == 5) {
            capture = p.createCapture(VIDEO) as any;
            // statment = displayText;
            capture.size(640, 480);
            capture.hide();
            stage = 6;
            // setStage(6);
            nextButton.yb = p.height;
          } else if (stage == 6 || stage == 7) {
            capture.loadPixels();
            applyTintEffect(capture);
            capture.updatePixels();

            let scaleWidth = p.windowWidth / capture.width;
            let scaleHeight = p.windowHeight / capture.height;

            scaleFactor = p.max(scaleWidth, scaleHeight);

            posY = (p.windowHeight - capture.height * scaleFactor) / 2;
            // posX = (p.windowWidth - capture.width * scaleFactor) / 2;

            p.push();
            p.translate(p.windowWidth / 2, p.windowHeight / 2);
            p.scale(-1 * scaleFactor, scaleFactor); // Odbicie lustrzane i skalowanie
            p.image(capture, -capture.width / 2, -capture.height / 2);
            p.pop();

            if (stage == 6) {
              const { pressed, newStage, newLang } = pictureButton.display(
                pink,
                darkRed,
                mPressed,
                p,
                stage,
                currentLayout,
                // setStage,
                // setCurrLang,
              );
              if (pressed) {
                console.log({ pressed, newLang, newStage });
                stage = newStage;
                currentLayout = newLang;
              }
              countDownTxt = 3;
            } else {
              countDown();
            }
          } else if (stage == 8) {
            p.image(capturedImage, 0, 0);
            let { pressed, newStage, newLang } = nextButton.display(
              pink,
              darkRed,
              mPressed,
              p,
              stage,
              currentLayout,
            );
            if (pressed) {
              stage = newStage;
              currentLayout = newLang;
            }
            let {
              pressed: pr,
              newStage: st,
              newLang: lg,
            } = repeatButton.display(
              pink,
              darkRed,
              mPressed,
              p,
              stage,
              currentLayout,
            );
            if (pr) {
              stage = st;
              currentLayout = lg;
            }
          } else if (stage == 9) {
            p.image(capturedImage, 0, 0);
            p.push(); // Start a new drawing state
            p.stroke(darkRed);
            p.strokeWeight(90);

            let lineHeight = p.textAscent() + p.textDescent();
            let spacing = 80; // Custom spacing between lines

            // Handling multiple lines based on 'enter' character in displayText
            let textLines = displayText.split("\n");
            let yPos = 80;
            let underlineData = [];

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
            p.text(userName, 40, yPos, p.width - 80, p.height / 4);
            p.pop();
            const { pressed, newStage } = finishButton.display(
              pink,
              darkRed,
              mPressed,
              p,
              stage,
              currentLayout,
            );
            if (pressed && newStage) {
              stage = newStage;
            }
          } else if (stage == 10) {
            p.image(capturedImage, 0, 0);
            p.push(); // Start a new drawing state
            p.stroke(darkRed);
            p.strokeWeight(90);

            let lineHeight = p.textAscent() + p.textDescent();
            let spacing = 80; // Custom spacing between lines

            // Handling multiple lines based on 'enter' character in displayText
            let textLines = displayText.split("\n");
            let yPos = 80;
            let underlineData = [];

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
            p.text(userName, 40, yPos, p.width - 80, p.height / 4);
            p.pop();
            // upload image to storage
            let saving = true;

            let cnv = document.querySelector("canvas");

            if (cnv) {
              cnv.getContext("2d", {
                willReadFrequently: true,
              });
              // how to let p5 know to stop redrawing
              cnv.toBlob(
                (blob) => {
                  p.noLoop();
                  if (blob) {
                    const name =
                      "poster_" + posterIndex + "_" + currentLayout + ".jpg";
                    const formData = new FormData();
                    formData.append("blob", blob);
                    formData.append("fileName", name);

                    p.textSize(70);
                    p.fill(darkRed);
                    p.text("Saving poster...", p.width / 2, p.height / 2);

                    saveImage(formData).then(({ success }) => {
                      p.loop();
                      stage = -1;

                      p.textSize(70);
                      p.fill(darkRed);
                      p.text(`Success: ${success}`, p.width / 2, p.height / 2);
                    });
                  }
                },
                "image/jpg",
                0.2,
              );

              posterIndex++;
            }

            //go back to start
          }

          if (stage > 1 && stage != 7 && stage < 10) {
            const { pressed, newStage } = backButton();
            if (pressed) {
              stage = newStage ?? stage;
            }
          }
        };

        function countDown() {
          if (countDownTxt == 0) {
            capturedImage = p.get();
            capture.stop();
            applyTintEffect(capturedImage);
            // stage++;
            stage = stage + 1;
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

        function applyTintEffect(img: Image) {
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
          // p.fullscreen(true);
          if (wait == 0) {
            mPressed = true;
            keys.forEach((key) => {
              if (key.isClicked(p.mouseX, p.mouseY)) {
                handleKey(key.value);
              }
            });
          }
          // console.log("POST", { currLang, stage });
          wait = 2;
          lastActivityTime = p.millis();
        };

        p.mouseReleased = () => {
          mPressed = false;
        };

        function handleKey(value: string) {
          if (value === "bksp") {
            currentText = currentText.substring(0, currentText.length - 1);
          } else if (value === "language") {
            lang++;
            if (lang == languages.length) {
              lang = 0;
            }
            currentLayout = languages[lang];
            updateKeys(currentLayout);
            t = 0;
            displayLangText = true;
          } else if (value === "shift") {
            capsLock = !capsLock;
          } else if (value === "enter" && stage != 1) {
            currentText += "\n";
          } else if (value === "space") {
            currentText += " ";
          } else if (value === "alt") {
            altPressed = !altPressed; // Toggle alt state
          } else {
            if (
              altPressed &&
              altLayouts[currentLayout] &&
              altLayouts[currentLayout][value]
            ) {
              currentText += altLayouts[currentLayout][value];
            } else {
              currentText += capsLock
                ? value.toUpperCase()
                : value.toLowerCase();
            }
          }
          displayText = currentText;
        }

        function updateKeys(layout: Language) {
          keys = [];
          let keyboard: keyof Layouts;
          if (layout === "french" || layout === "greek") {
            keyboard = layout;
          } else {
            keyboard = "other";
          }

          if (currentLayout == "greek") {
            p.textFont(openBold);
          } else {
            p.textFont(archivoBold);
          }

          const numRows = layouts[keyboard].length;
          //let keyHeight = height / (numRows + 1) * 0.8;  // Calculate the height of each key
          let keyHeight = 60;
          let startY = p.height - keyHeight * numRows; // Start from the bottom of the screen

          layouts[keyboard].forEach((row, rowIndex) => {
            let rowKeys = row.split(" ");
            rowKeys.forEach((key, keyIndex) => {
              let keyWidth = p.width / rowKeys.length;
              let yPosition = startY + rowIndex * keyHeight; // Calculate y position based on bottom alignment
              keys.push(
                new Key(
                  keyIndex * keyWidth,
                  yPosition,
                  keyWidth,
                  keyHeight,
                  key,
                  p,
                ),
              );
            });
          });
        }

        function displayLang() {
          p.fill(0, 255 - langT);
          p.noStroke();
          p.textSize(100);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(languages[lang], p.width / 2, p.height / 2);
          langT += 5;
          if (langT > 255) {
            langT = 0;
            displayLangText = false;
          }
        }

        function checkUserActivity(): number | null {
          if (p.millis() - lastActivityTime > INACTIVITY_THRESHOLD) {
            return 0;

            // setStage(0);
          }
          return null;
        }

        function backButton() {
          let pressed = false;
          let newStage: number | undefined;
          let wb = 100;
          let hb = 50;
          let marginB = 30;
          let sW = 30;

          p.push();

          if (
            p.mouseX >= marginB &&
            p.mouseX <= marginB * 2 + sW / 2 + wb &&
            p.mouseY >= marginB &&
            p.mouseY <= marginB + hb
          ) {
            p.fill(violet);
            p.stroke(pink);
            if (mPressed) {
              pressed = true;
              newStage = 0;
              // stage = 0;

              // setStage(0);
            }
          } else {
            p.fill(darkRed);
            p.stroke(yellowBrown);
          }
          p.strokeWeight(sW);
          p.line(
            marginB * 2 + sW / 2,
            marginB * 2,
            marginB * 2 + wb,
            marginB * 2,
          );
          p.noStroke();
          p.triangle(
            marginB * 2 + (p.cos(a1) * hb) / 2,
            marginB * 2 + (p.sin(a1) * hb) / 2,
            marginB * 2 + (p.cos(a2) * hb) / 2,
            marginB * 2 + (p.sin(a2) * hb) / 2,
            marginB * 2 + (p.cos(a3) * hb) / 2,
            marginB * 2 + (p.sin(a3) * hb) / 2,
          );
          p.pop();
          return { pressed, newStage };
        }

        function windowResized() {
          p.resizeCanvas(p.windowWidth - 5, p.windowHeight - 5);
        }

        // });
      }, processingRef.current);
      // newp5 = new p5(Sketch(), processingRef.current);
    }
  }, []);
  return (
    <>
      <div className="l-h-animation" ref={processingRef}>
        <div id="p5_loading" className="loadingclass">
          <p>Loading...</p>
        </div>
      </div>
    </>
  );
};

export default Photobooth;
