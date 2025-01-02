import { useNarrationContext } from "../../narratives/NarrationsContext";
import React from "react";

const NarrationsCloseButton = (props: { onClose?: () => void }) => {
  const { onClose } = props;
  const { setCurrentIndex } = useNarrationContext();

  return (
    <a
      href="#"
      onClick={() => {
        setCurrentIndex(0);
        if (onClose) onClose();
      }}
      className="absolute left-4 top-2 z-10 bg-transparent p-2 text-white transition-colors hover:bg-black_bg hover:text-yellow_secondary md:left-16 md:top-4 md:p-5"
    >
      <span className="text-lg font-bold md:text-xl">X</span>
    </a>
  );
};

export default NarrationsCloseButton;