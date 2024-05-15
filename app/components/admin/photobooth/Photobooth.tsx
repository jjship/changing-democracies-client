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
  Params,
} from "@/lib/photobooth/const";
import { BtnLang } from "@/lib/photobooth/BtnLang";
import { DavButton } from "@/lib/photobooth/Button";
import { Key } from "@/lib/photobooth/Key";
import { saveImage } from "@/components/admin/actions";
import { BackButton } from "../../../../lib/photobooth/BackButton";

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

const Photobooth = ({ location }: { location: string }) => {
  // const [currLang, setCurrLang] = useState<Language>("english");
  // const [stage, setStage] = useState<number>(-1);

  const processingRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const p5 = require("p5");
    let locationInSetup = location;
    // let newp5;
    if (processingRef.current) {
      new p5((p: P) => {
        let capture: any;

        // let mPressed = false;

        let languageButtons: BtnLang[] = [];

        let keys: Key[] = [];
        // let params.currentLang: Language;
        // let params.currentLang: Language = currLang;
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

        // let stage = -1;

        let backButton: BackButton;

        let nextButton: DavButton;
        let repeatButton: DavButton;
        let pictureButton: DavButton;
        let startButton: DavButton;
        let finishButton: DavButton;

        let allButtons: DavButton[] = [];

        let VIDEO: TYPE;

        // let currentLang: Language;

        const params: Params = {
          currentLang: "",
          stage: -1,
        };

        p.preload = () => {
          archivoBold = p.loadFont("/fonts/Archivo-Bold.ttf");
          openBold = p.loadFont("/fonts/OpenSans-Bold.ttf");
        };

        p.setup = () => {
          // const location = locationInSetup;
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

          allButtons.push(
            nextButton,
            finishButton,
            repeatButton,
            pictureButton,
            startButton,
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

          for (let i = 0; i < languages.length; i++) {
            let language = languages[i];
            let btnY = startY + i * (buttonHeight + buttonSpacing);
            languageButtons.push(
              new BtnLang(language, startX, btnY, buttonWidth, p),
            );
          }
        };

        p.draw = () => {
          if (wait > 0) {
            wait--;
          }
          const change = checkUserActivity();
          if (change) {
            params.stage = change;
          }
          p.background(turquoise);

          if (params.stage == -1) {
            languageButtons.forEach((button) => {
              button.display(
                pink,
                darkRed,
                // mPressed,
                p,
                // params,
                languageAbbreviations,
                archivoBold,
              );
              // if (pressed) {
              //   stage = newStage;
              //   params.currentLang = newLang;
              // }
            });
          } else if (params.stage == 0) {
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
                params.currentLang,
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
                params.currentLang,
                "Express your feelings about Democracy",
                translations,
              ),
              p.width / 2,
              p.height / 2,
            );
            p.pop();
            startButton.display(
              pink,
              darkRed,
              // mPressed,
              p,
              params,
            );
            // if (pressed) {
            //   console.log({ pressed, stage, newStage });
            //   stage = newStage;
            //   params.currentLang = newLang;
            // }
          } else if (params.stage == 1) {
            t = 2;
            params.stage = 2;
            // setStage(2);

            updateKeys(params.currentLang as Language);
          } else if (params.stage == 2) {
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
              getTranslation(
                params.currentLang,
                "What is your name?",
                translations,
              ),
              p.width / 2,
              p.height / 8,
            );
            p.textSize(36);
            p.fill(darkRed);
            p.textAlign(p.CENTER, p.TOP);
            p.text(displayText, p.width / 2, p.height / 4);
            p.pop();
            nextButton.display(
              pink,
              darkRed,
              // mPressed,
              p,
              // stage,
              params,
            );

            keys.forEach((key) => {
              key.display(
                grey,
                darkGrey,
                black,
                openBold,
                archivoBold,
                altPressed,
                capsLock,
                params,
                p,
              );
            });
          } else if (params.stage == 3) {
            userName = displayText;
            displayText = "";
            currentText = "";
            params.stage = 4;
            // setStage(4);
          } else if (params.stage == 4) {
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
                params.currentLang,
                "Write your statement",
                translations,
              ),
              p.width / 2,
              p.height / 4,
            );

            nextButton.display(
              pink,
              darkRed,
              // mPressed,
              p,
              params,
            );

            keys.forEach((key) => {
              key.display(
                grey,
                darkGrey,
                black,
                openBold,
                archivoBold,
                altPressed,
                capsLock,
                params,
                p,
              );
            });

            // ...
          } else if (params.stage == 5) {
            capture = p.createCapture(VIDEO) as any;
            // statment = displayText;
            capture.size(640, 480);
            capture.hide();
            params.stage = 6;
            // setStage(6);
            nextButton.yb = p.height;
          } else if (params.stage == 6 || params.stage == 7) {
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

            if (params.stage == 6) {
              pictureButton.display(
                pink,
                darkRed,
                // mPressed,
                p,
                params,
                // setStage,
                // setCurrLang,
              );
              // if (pressed) {
              //   stage = newStage;
              //   params.currentLang = newLang;
              // }
              countDownTxt = 3;
            } else {
              countDown();
            }
          } else if (params.stage == 8) {
            p.image(capturedImage, 0, 0);
            nextButton.display(
              pink,
              darkRed,
              // mPressed,
              p,
              params,
            );

            repeatButton.display(pink, darkRed, p, params);
          } else if (params.stage == 9) {
            p.image(capturedImage, 0, 0);
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
            p.text(userName, 40, yPos, p.width - 80, p.height / 4);
            p.pop();
            finishButton.display(
              pink,
              darkRed,
              // mPressed,
              p,
              params,
            );
          } else if (params.stage == 10) {
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
            let cnv = document.querySelector("canvas");

            if (cnv) {
              cnv.getContext("2d", {
                willReadFrequently: true,
              });
              cnv.toBlob(
                (blob) => {
                  if (blob) {
                    const name =
                      "poster_" + posterIndex + "_" + location + ".jpeg";
                    const formData = new FormData();
                    formData.append("blob", blob);
                    formData.append("fileName", name);

                    saveImage(formData);
                  }
                },
                "image/jpeg",
                1,
              );

              posterIndex++;
            }

            //go back to start
            params.stage = -1;
          }

          if (params.stage > 1 && params.stage != 7 && params.stage < 10) {
            backButton.display(p, darkRed, violet, pink, yellowBrown, params);
          }

          // p.mousePressed = () => {
          //   // p.fullscreen(true);
          //   if (wait == 0) {
          //     if (stage == -1) {
          //       languageButtons.forEach((button) => {
          //         if (button.isClicked(p.mouseX, p.mouseY)) {
          //           button.handleClick(params.currentLang, stage);
          //         }
          //         console.log("post lang", { stage, currentLang });
          //       });
          //     }

          //     if (backButton.isClicked(p.mouseX, p.mouseY)) {
          //       backButton.handleClick();
          //     }

          //     allButtons.forEach((button) => {
          //       if (button.isClicked(p.mouseX, p.mouseY)) {
          //         button.handleClick(stage);
          //       }
          //     });
          //     if (wait == 0) {
          //       // mPressed = true;
          //       keys.forEach((key) => {
          //         if (key.isClicked(p.mouseX, p.mouseY)) {
          //           handleKey(key.value);
          //         }
          //       });
          //     }
          //     wait = 3;
          //     lastActivityTime = p.millis();
          //   }
          // };
        };

        function countDown() {
          if (countDownTxt == 0) {
            capturedImage = p.get();
            capture.stop();
            applyTintEffect(capturedImage);
            // stage++;
            params.stage = params.stage + 1;
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
            if (params.stage == -1) {
              languageButtons.forEach((button) => {
                if (button.isClicked(p.mouseX, p.mouseY)) {
                  button.handleClick(params);
                }
                console.log("post lang", params);
              });
            }

            if (backButton.isClicked(p.mouseX, p.mouseY)) {
              backButton.handleClick(params);
            }

            allButtons.forEach((button) => {
              if (button.isClicked(p.mouseX, p.mouseY)) {
                button.handleClick(params);
              }
            });
            if (wait == 0) {
              // mPressed = true;
              keys.forEach((key) => {
                if (key.isClicked(p.mouseX, p.mouseY)) {
                  handleKey(key.value);
                }
              });
            }
            wait = 3;
            lastActivityTime = p.millis();
          }
        };

        // p.mouseReleased = () => {
        //   mPressed = false;
        // };

        function handleKey(value: string) {
          if (value === "bksp") {
            currentText = currentText.substring(0, currentText.length - 1);
          } else if (value === "language") {
            lang++;
            if (lang == languages.length) {
              lang = 0;
            }
            params.currentLang = languages[lang];
            updateKeys(params.currentLang);
            t = 0;
            displayLangText = true;
          } else if (value === "shift") {
            capsLock = !capsLock;
          } else if (value === "enter" && params.stage != 1) {
            currentText += "\n";
          } else if (value === "space") {
            currentText += " ";
          } else if (value === "alt") {
            altPressed = !altPressed; // Toggle alt state
          } else {
            if (
              altPressed &&
              altLayouts[params.currentLang as Language] &&
              altLayouts[params.currentLang as Language][value]
            ) {
              currentText += altLayouts[params.currentLang as Language][value];
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

          if (params.currentLang == "greek") {
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
          }
          return null;
        }

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth - 5, p.windowHeight - 5);
        };
      }, processingRef.current);
    }
  });
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
