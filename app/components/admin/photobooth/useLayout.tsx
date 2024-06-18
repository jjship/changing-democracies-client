import { KeyboardLayoutObject } from "react-simple-keyboard";
import keyboardLayouts from "./keyboardLayouts";
import { useState, useEffect } from "react";
import { useBoothContext } from "./BoothContext";
import { languageAbbreviations } from "./boothConstats";

export const useLayout = () => {
  const [layout, setLayout] = useState<KeyboardLayoutObject>(
    keyboardLayouts["EN"],
  );
  const { currentLang } = useBoothContext();

  useEffect(() => {
    if (currentLang)
      setLayout(keyboardLayouts[languageAbbreviations[currentLang]]);
  }, [currentLang]);

  return layout;
};
