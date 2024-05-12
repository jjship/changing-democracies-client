let capture;

let mPressed = false;

let languageButtons = [];

let keys = [];
let currentLayout = "english";
let currentText = "";
let capsLock = false;
let displayText = "";
let altPressed = false;

let lastActivityTime;

let posterIndex = 0;

let userName = "";

let archivoBold;
let openBold;

let lang = 0;

let textData = {
  textLinesData:
[],
  statement:
""
  };

let a1;
let a2;
let a3;
let r;

let t = 0;
let wait = 0;
let langT = 0;
let countDownText = 0;
let capturedImage;
let yb = 0;
let ybc = 0;
let easing = 0.09;
let displayLangText = false;

let scaleFactor;
let posY;
let posX;

let stage = -1;

let nextButton;
let repeatButton;
let pictureButton;
let startButton;
let finishButton;

function preload() {
  archivoBold = loadFont('fonts/Archivo-Bold.ttf');
  openBold = loadFont('fonts/OpenSans-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth-5, windowHeight-5);

  let cnv = document.querySelector('canvas');
  if (cnv) {
    cnv.getContext('2d', {
    willReadFrequently:
      true
    }
    );
  }
  frameRate(18);

  textFont(archivoBold);
  yb = height*2;


  a1 = PI;
  a2 = a1 + TWO_PI*1/3;
  a3 = a2 + TWO_PI*1/3;
  r = 80;

  nextButton = new Button("Next", width / 2 - 200 / 2, height / 2, 200);
  finishButton = new Button("Finish", width / 2 - 240 / 2, 5 * height / 6, 240);
  repeatButton = new Button("Repeat picture", width / 2 - 400 / 2, 2 * height / 3, 400, 5);
  pictureButton = new Button("Take a picture", width / 2 - 400 / 2, 5 * height / 6, 400);
  startButton = new Button("Start", width / 2 - 200 / 2, 2 * height / 3, 200);

  const buttonWidth = 120;
  const buttonHeight = 50;
  const buttonSpacing = 20;

  let startX = (width - buttonWidth) / 2;
  let startY = (height - (buttonHeight * languages.length + buttonSpacing * (languages.length - 1))) / 2;

  for (let i = 0; i < languages.length; i++) {
    let language = languages[i];
    let btnY = startY + i * (buttonHeight + buttonSpacing);
    languageButtons.push(new BtnLang(language, startX, btnY, buttonWidth));
  }
}


function draw() {
  if (wait >0) {
    wait--;
  }
  checkUserActivity();
  background(turquoise);

  if (stage == -1) {
    languageButtons.forEach(button => {
      button.display();
    }
    );
  } else if (stage == 0) {
    userName = ""; // Clear userName
    displayText = '';
    currentText  = '';
  textData = { textLinesData:
  [], statement:
    ""
  }; // Reset textData

  altPressed = false;
  capsLock = false;
  push();
  fill(black);
  noStroke();
  textSize(24);
  textAlign(CENTER, CENTER);
  text(getTranslation(currentLayout, "Make your own poster"), width/2, height/8);

  fill(darkRed);
  textSize(32);
  text(getTranslation(currentLayout, "Express your feelings about Democracy"), width/2, height/2);
  pop();
  startButton.display();
} else if (stage == 1) {
  t = 2;
  stage = 2;

  updateKeys(currentLayout);
} else if (stage == 2) {
  if (displayLangText) {
    displayLang();
  }

  if (t > 0) {
    currentText = currentText.substring(0, currentText.length - 1);
    t--;
  }
  push();
  fill(black);
  noStroke();
  textSize(24);
  textAlign(CENTER, CENTER);
  text(getTranslation(currentLayout, "What is your name?"), width/2, height/8);
  textSize(36);
  fill(darkRed);
  textAlign(CENTER, TOP);
  text(displayText, width/2, height/4);
  pop();
  nextButton.display();

  keys.forEach(key => {
    key.display();
  }
  );
} else if (stage==3) {
  userName = displayText;
  displayText = '';
  currentText  = '';
  stage = 4;
} else if (stage == 4) {
  if (displayLangText) {
    displayLang();
  }

  push(); // Start a new drawing state
  noStroke();
  textSize(36);
  textAlign(RIGHT, TOP);

  let lineHeight = textAscent() + textDescent();
  let spacing = 80; // Custom spacing between lines

  let textLines = displayText.split('\n');
  let yPos = 80;
  let underlineData = [];

  textData.textLinesData = []; // Clear previous data

  textLines.forEach((textLine, index) => {
    let textLineWidth = textWidth(textLine);
    underlineData.push( {
    startX:
      width,
      endX:
      width - 100 - textLineWidth,
      y:
      yPos + lineHeight
    }
    );

    // Store each line's data
    textData.textLinesData.push( {
    text:
      textLine,
      width:
      textLineWidth,
      y:
      yPos
    }
    );

    yPos += lineHeight + spacing;
  }
  );

  // Store the complete statement
  textData.statement = displayText;

  // Draw all underlines

  underlineData.forEach(underlineItem => {
    push();
    stroke(darkRed);
    strokeWeight(90);
    line(underlineItem.startX, underlineItem.y, underlineItem.endX, underlineItem.y);
    noStroke();
    fill(yellowBrown);
    triangle(underlineItem.endX-r/2+cos(a1)*r, underlineItem.y+sin(a1) *r, underlineItem.endX-r/2+cos(a2)*r, underlineItem.y+sin(a2)*r, underlineItem.endX-r/2+cos(a3)*r, underlineItem.y+sin(a3)*r);
    pop();
  }
  );

  // Draw all text lines
  fill(pink);
  noStroke();
  textData.textLinesData.forEach(textLineData => {
    text(textLineData.text, 40, textLineData.y+16, width - 80, height / 8);
  }
  );

  pop(); // Restore original drawing state

  fill(black);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(getTranslation(currentLayout, "Write your statement"), width / 2, height / 4);

  nextButton.display();

  keys.forEach(key => {
    key.display();
  }
  );
} else if (stage == 5) {
  // statment = displayText;
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  stage = 6;
  nextButton.yb = height;
} else if (stage == 6 || stage == 7) {
  capture.loadPixels();
  applyTintEffect(capture);
  capture.updatePixels();

  let scaleWidth = windowWidth / capture.width;
  let scaleHeight = windowHeight / capture.height;

  scaleFactor = max(scaleWidth, scaleHeight);

  posY = (windowHeight - capture.height * scaleFactor) / 2;
  // posX = (windowWidth - capture.width * scaleFactor) / 2;


  push();
  translate(windowWidth / 2, windowHeight / 2);
  scale(-1 * scaleFactor, scaleFactor); // Odbicie lustrzane i skalowanie
  image(capture, -capture.width / 2, -capture.height / 2);
  pop();

  if (stage==6) {
    pictureButton.display();
    countDownTxt = 3;
  } else {
    countDown();
  }
} else if (stage == 8) {
  image(capturedImage, 0, 0);
  nextButton.display();
  repeatButton.display();
} else if (stage == 9) {
  image(capturedImage, 0, 0);
  push(); // Start a new drawing state
  stroke(darkRed);
  strokeWeight(90);

  let lineHeight = textAscent() + textDescent();
  let spacing = 80; // Custom spacing between lines

  // Handling multiple lines based on 'enter' character in displayText
  let textLines = displayText.split('\n');
  let yPos = 80;
  let underlineData = [];

  // Draw all underlines from saved data
  textData.textLinesData.forEach(textLineData => {
    let startX = width;
    let endX = width - 100 - textLineData.width;
    stroke(darkRed);
    strokeWeight(90);
    line(startX, textLineData.y + lineHeight - 16, endX, textLineData.y + lineHeight - 16); // Adjust y position for underline
    noStroke();
    fill(yellowBrown);
    triangle(endX-r/2+cos(a1)*r, textLineData.y + lineHeight - 16+sin(a1) *r, endX-r/2+cos(a2)*r, textLineData.y + lineHeight - 16+sin(a2)*r, endX-r/2+cos(a3)*r, textLineData.y + lineHeight - 16+sin(a3)*r);
  }
  );

  // Draw all text lines from saved data
  fill(pink);
  textSize(36);
  textAlign(RIGHT, TOP);
  noStroke();

  textData.textLinesData.forEach(textLineData => {
    text(textLineData.text, 40, textLineData.y-8, width - 80, height / 8);

    // Increment yPos for the next line
    yPos = textLineData.y + lineHeight + spacing; // Keep track of the last y position
  }
  );

  textSize(70);
  fill(darkRed);
  text(userName, 40, yPos, width-80, height/4);
  pop();
  finishButton.display();
} else if (stage==10) {
  /*
  let canvas = $('canvas')[0];
  let data = canvas.toDataURL('image/png').replace(/data:
  image\/png;
  base64, /, '');

  let iname = 'poster_' + posterIndex + "_" + currentLayout +'.png';

  $('canvas').remove();
  $.post('save.php', {
  data:
    data, iname
  }
  );

  posterIndex++;
  */
  stage = 0;
}



if (stage > 1 && stage != 7 && stage < 10) {
  backButton();
}


}


function applyTintEffect(img) {
  let startColor = color(black); // Dark
  let endColor = color(turquoise); // Light
  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let index = (x + y * capture.width) * 4;
      let brightnessValue = (capture.pixels[index] + capture.pixels[index + 1] + capture.pixels[index + 2]) / 3;
      let t = map(brightnessValue, 0, 255, 0, 1);
      let interColor = lerpColor(startColor, endColor, t);
      capture.pixels[index] = red(interColor);
      capture.pixels[index + 1] = green(interColor);
      capture.pixels[index + 2] = blue(interColor);
    }
  }
}

function mousePressed() {
  fullscreen(true);
  if (wait == 0) {
    mPressed = true;

    keys.forEach(key => {
      if (key.isClicked(mouseX, mouseY)) {
        handleKey(key.value);
      }
    }
    );
  }
  wait = 2;
  lastActivityTime = millis();
}

function mouseReleased() {
  mPressed = false;
}

function handleKey(value) {
  if (value === "bksp") {
    currentText = currentText.substring(0, currentText.length - 1);
  } else if (value === "language") {
    lang++;
    if (lang==languages.length) {
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
    if (altPressed && altLayouts[currentLayout] && altLayouts[currentLayout][value]) {
      currentText += altLayouts[currentLayout][value];
    } else {
      currentText += capsLock ? value.toUpperCase() : value.toLowerCase();
    }
  }
  displayText = currentText;
}

function updateKeys(layout) {
  keys = [];
  let keyboard;
  if (layout === "french" || layout === "greek") {
    keyboard = layout;
  } else {
    keyboard = "other";
  }

  if (currentLayout == "greek") {
    textFont(openBold);
  } else {
    textFont(archivoBold);
  }

  const numRows = layouts[keyboard].length;
  //let keyHeight = height / (numRows + 1) * 0.8;  // Calculate the height of each key
  let keyHeight = 60;
  let startY = height - keyHeight * numRows;  // Start from the bottom of the screen

  layouts[keyboard].forEach((row, rowIndex) => {
    let rowKeys = row.split(' ');
    rowKeys.forEach((key, keyIndex) => {
      let keyWidth = width / rowKeys.length;
      let yPosition = startY + rowIndex * keyHeight;  // Calculate y position based on bottom alignment
      keys.push(new Key(keyIndex * keyWidth, yPosition, keyWidth, keyHeight, key));
    }
    );
  }
  );
}


function displayLang() {
  fill(0, 255-langT);
  noStroke();
  textSize(100);
  textAlign(CENTER, CENTER);
  text(languages[lang], width/2, height/2);
  langT += 5;
  if (langT>255) {
    langT = 0;
    displayLangText = false;
  }
}

function getTranslation(language, text) {
  return translations[language][text];
}


function countDown() {
  if (countDownTxt==0) {
    capturedImage = get();
    capture.stop();
    applyTintEffect(capturedImage);
    stage++;
  } else {
    push();
    noStroke();
    textFont(archivoBold);
    fill(184, 82, 82, 255-langT); //darkRed
    circle(width/2, 200, 200);
    fill(231, 216, 221, 255-langT); //pink
    textSize(100);
    textAlign(CENTER, CENTER);
    text(countDownTxt, width/2, 190);
    pop();
    langT += 30;
    if (langT>255) {
      langT = 0;
      countDownTxt--;
    }
  }
}

function checkUserActivity() {
  if (millis() - lastActivityTime > INACTIVITY_THRESHOLD) {
    stage = 0;
  }
}

function backButton() {
  let wb = 100;
  let hb = 50;
  let marginB = 30;
  let sW = 30;

  push();

  if (mouseX >= marginB && mouseX <= marginB*2+sW/2 + wb && mouseY >= marginB && mouseY <= marginB + hb) {
    fill(violet);
    stroke(pink);
    if (mPressed) {
      stage = 0;
    }
  } else {
    fill(darkRed);
    stroke(yellowBrown);
  }
  strokeWeight(sW);
  line(marginB*2+sW/2, marginB*2, marginB*2+wb, marginB*2);
  noStroke();
  triangle(marginB*2+cos(a1)*hb/2, marginB*2 +sin(a1)*hb/2, marginB*2+cos(a2)*hb/2, marginB*2+sin(a2)*hb/2, marginB*2+cos(a3)*hb/2, marginB*2+sin(a3)*hb/2);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth-5, windowHeight-5);
}
