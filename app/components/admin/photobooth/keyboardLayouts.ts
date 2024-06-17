import english from "simple-keyboard-layouts/build/layouts/english";
import polish from "simple-keyboard-layouts/build/layouts/polish";
import greek from "simple-keyboard-layouts/build/layouts/greek";
import french from "simple-keyboard-layouts/build/layouts/french";
import czech from "simple-keyboard-layouts/build/layouts/czech";
import spanish from "simple-keyboard-layouts/build/layouts/spanish";
import { KeyboardLayoutObject } from "react-simple-keyboard";

import { Language, LanguageAbbreviations } from "./boothConstats";

export type LayoutType = "default" | "shift";

const keyboardLayouts: Record<
  LanguageAbbreviations[Language],
  KeyboardLayoutObject
> = {
  EN: english.layout,
  PL: polish.layout,
  GR: greek.layout,
  NL: english.layout,
  FR: french.layout,
  CZ: czech.layout,
  HR: english.layout,
  LT: english.layout,
  ES: spanish.layout,
  PT: english.layout,
  RO: english.layout,
};

export default keyboardLayouts;
