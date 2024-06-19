import { KeyboardLayoutObject } from "react-simple-keyboard";
import keyboardLayouts, { LayoutType } from "./keyboardLayouts";
import {
  useState,
  useEffect,
  SetStateAction,
  useCallback,
  Dispatch,
} from "react";
import { useBoothContext } from "./BoothContext";
import { languageAbbreviations } from "./boothConstats";

export type LayoutKey = "{shift}" | "{lock}" | "{alt}";

export const useLayout = (setType: Dispatch<SetStateAction<LayoutType>>) => {
  const [layout, setLayout] = useState<KeyboardLayoutObject>(
    keyboardLayouts["EN"],
  );
  const { currentLang } = useBoothContext();

  useEffect(() => {
    if (currentLang)
      setLayout(keyboardLayouts[languageAbbreviations[currentLang]]);
  }, [currentLang]);

  const handleLayoutTypeChange = useCallback(
    (key: LayoutKey) => {
      if (isShiftKey(key))
        setType((prevType) => {
          if (isShiftType(prevType))
            return prevType.split("-")[1] as "default" | "alt";
          if (isAltType(prevType)) return "shift-alt";
          return "shift-default";
        });
      if (isAltKey(key)) {
        setType((prevType) => {
          if (isAltType(prevType) && isShiftType(prevType))
            return "shift-default";
          if (isAltType(prevType)) return "default";
          if (isShiftType(prevType)) return "shift-alt";
          return "alt";
        });
      }
    },
    [setType],
  );

  return { layout, handleLayoutTypeChange };
};

const isShiftKey = (key: LayoutKey) => {
  return key === "{lock}" || key === "{shift}";
};
const isAltKey = (key: LayoutKey) => {
  return key === "{alt}";
};
const isShiftType = (
  type: LayoutType,
): type is "shift-default" | "shift-alt" => {
  return type.split("-")[0] === "shift";
};
const isAltType = (type: LayoutType) => {
  const splitted = type.split("-");
  return splitted[splitted.length - 1] === "alt";
};
