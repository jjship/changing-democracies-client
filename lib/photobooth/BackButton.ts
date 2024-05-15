"use client";

import { P, Language, Params } from "./const";

export class BackButton {
  wb: number;
  hb: number;
  marginB: number;
  sW: number;
  a1: number;
  a2: number;
  a3: number;

  constructor(p: P) {
    this.wb = 100;
    this.hb = 50;
    this.marginB = 30;
    this.sW = 30;
    this.a1 = p.PI;
    this.a2 = this.a1 + (p.TWO_PI * 1) / 3;
    this.a3 = this.a2 + (p.TWO_PI * 1) / 3;
  }

  display(
    p: P,
    darkRed: string,
    violet: string,
    pink: string,
    yellowBrown: string,
    params: Params,
  ) {
    // let newStage = params.stage: { currentLang: Language | ""; stage: number } ;
    p.push();

    if (this.isClicked(p.mouseX, p.mouseY)) {
      params.stage = 0;
      p.fill(violet);
      p.stroke(pink);
    } else {
      p.fill(darkRed);
      p.stroke(yellowBrown);
    }

    p.strokeWeight(this.sW);
    p.line(
      this.marginB * 2 + this.sW / 2,
      this.marginB * 2,
      this.marginB * 2 + this.wb,
      this.marginB * 2,
    );
    p.noStroke();
    p.triangle(
      this.marginB * 2 + (p.cos(this.a1) * this.hb) / 2,
      this.marginB * 2 + (p.sin(this.a1) * this.hb) / 2,
      this.marginB * 2 + (p.cos(this.a2) * this.hb) / 2,
      this.marginB * 2 + (p.sin(this.a2) * this.hb) / 2,
      this.marginB * 2 + (p.cos(this.a3) * this.hb) / 2,
      this.marginB * 2 + (p.sin(this.a3) * this.hb) / 2,
    );
    p.pop();
    // return newStage;
  }

  isClicked(x: number, y: number): boolean {
    return (
      x >= this.marginB &&
      x <= this.marginB * 2 + this.sW / 2 + this.wb &&
      y >= this.marginB &&
      y <= this.marginB + this.hb
    );
  }

  handleClick(params: { currentLang: Language | ""; stage: number }) {
    params.stage = 0;
  }
}
