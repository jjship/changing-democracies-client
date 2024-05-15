import { Language, P, Params, altLayouts } from "./const";
import p5 from "p5";

export class Key {
  x: number;
  y: number;
  w: number;
  h: number;
  value: string;

  constructor(x: number, y: number, w: number, h: number, value: string, p: P) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.value = value;
  }

  display(
    grey: string,
    darkGrey: string,
    black: string,
    openBold: p5.Font,
    archivoBold: p5.Font,
    altPressed: boolean,
    capsLock: boolean,
    params: Params,
    p: P,
  ) {
    const currentLang = params.currentLang as Language;
    p.push();

    if (currentLang == "greek") {
      p.textFont(openBold);
    } else {
      p.textFont(archivoBold);
    }
    p.fill(this.isClicked(p.mouseX, p.mouseY) ? grey : darkGrey);
    if (altPressed && this.value == "alt") {
      p.fill(grey);
    }
    if (capsLock && this.value == "shift") {
      p.fill(grey);
    }
    p.stroke(black);
    p.strokeWeight(1);
    p.rect(this.x, this.y, this.w, this.h, 5);
    p.noStroke();
    p.fill(255);
    p.textSize(16);
    p.textAlign(p.CENTER, p.CENTER);
    let displayValue = this.value;
    if (
      altPressed &&
      altLayouts[currentLang] &&
      altLayouts[currentLang][this.value]
    ) {
      displayValue = altLayouts[currentLang][this.value];
    }
    if (capsLock) {
      displayValue = displayValue.toUpperCase();
    }
    p.text(displayValue, this.x + this.w / 2, this.y + this.h / 2);
    p.pop();
  }

  isClicked(px: number, py: number) {
    return (
      px >= this.x &&
      px <= this.x + this.w &&
      py >= this.y &&
      py <= this.y + this.h
    );
  }
}
