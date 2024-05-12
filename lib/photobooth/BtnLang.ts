import p5 from "p5";
import { Language, LanguageAbbreviations, P } from "./const";

export class BtnLang {
  txt: Language;
  x: number;
  y: number;
  w: number;
  h: number;
  easing: number;
  yb: number;

  constructor(txt: Language, x: number, y: number, w: number, p: P) {
    this.txt = txt;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = 50;
    this.easing = 0.09;
    this.yb = p.height * 2; // initial y position for animation
  }

  display(
    pink: string,
    darkRed: string,
    mPressed: boolean,
    p: P,
    currentLayout: Language,
    stage: number,
    languageAbbreviations: LanguageAbbreviations,
    archivoBold: p5.Font,
  ) {
    let d = this.y - this.yb;
    this.yb += d * this.easing;
    if (mPressed) {
      // mPressed powinno być zdefiniowane globalnie
      currentLayout = this.txt;
      stage = 0;
    }
    if (
      p.mouseX >= this.x &&
      p.mouseX <= this.x + this.w &&
      p.mouseY >= this.yb - this.h &&
      p.mouseY <= this.yb
    ) {
      p.fill(pink); // Color of the button when hovered
      if (mPressed) {
        currentLayout = this.txt;
        stage = 0;
      }
    } else {
      p.fill(darkRed); // Default color of the button
    }
    p.push();
    p.textFont(archivoBold);
    p.noStroke();
    p.rect(this.x, this.yb - this.h, this.w, this.h, 15);
    p.fill(255);
    p.textSize(24);
    p.textAlign(p.CENTER, p.TOP);
    let abbreviation = languageAbbreviations[this.txt ?? "N/A"];
    p.text(abbreviation, this.x + this.w / 2, this.yb - this.h + this.h / 4);
    p.pop();
  }
}
