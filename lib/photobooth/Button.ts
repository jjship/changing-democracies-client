import { Language, P, getTranslation, translations } from "./const";
import { Element } from "p5";

export class DavButton {
  txt: string;
  x: number;
  y: number;
  w: number;
  h: number;
  easing: number;
  yb: number;
  nextStage: number | null;
  y2: number;
  yb2: number;

  constructor(
    txt: string,
    x: number,
    y: number,
    w: number,
    nextStage: null | number = null,
    p: P,
  ) {
    this.txt = txt;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = 50;
    this.nextStage = nextStage;
    this.easing = 0.09;
    this.yb = p.height;
    this.y2 = y;
    this.yb2 = p.height;
  }

  display(
    pink: string,
    darkRed: string,
    // mPressed: boolean,
    p: P,
    stage: number,
    currentLayout: Language,
  ): { pressed: boolean; newStage: number; newLang: Language } {
    let pressed: boolean = false;
    let newStage = stage;
    let newLang = currentLayout;
    let d = this.y - this.yb;

    this.yb += d * this.easing;

    p.push();

    if (
      p.mouseX >= this.x &&
      p.mouseX <= this.x + this.w &&
      p.mouseY >= this.yb - this.h &&
      p.mouseY <= this.yb
    ) {
      p.fill(pink); // Color of the button when hovered
      // if (mPressed) {
      // pressed = true;
      // newStage = stage + 1;
      // }
      // p.loop();
    } else {
      p.fill(darkRed); // Default color of the button
      p.loop();
    }

    p.noStroke();
    p.rect(this.x, this.yb - this.h, this.w, this.h, 15);
    p.fill(255);
    p.textSize(24);
    p.textAlign(p.CENTER, p.TOP);
    let gr = 0;
    if (currentLayout == "greek") {
      gr = 5;
    }
    p.text(
      getTranslation(currentLayout, this.txt, translations),
      this.x + this.w / 2,
      this.yb - this.h + this.h / 4 - gr,
    );
    p.pop();

    return { pressed, newStage, newLang };
  }

  isClicked(px: number, py: number): boolean {
    return (
      px >= this.x &&
      px <= this.x + this.w &&
      py >= this.yb - this.h &&
      py <= this.yb
    );
  }

  handleClick(stage: number): number {
    const newStage = this.nextStage ? this.nextStage : stage + 1;

    this.reset();

    return newStage;
  }

  reset() {
    this.y = this.y2;
    this.yb = this.yb2;
  }
}

export type ButtonType = DavButton;
