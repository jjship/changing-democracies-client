import { FC } from "react";

type NarrationCloseButtonProps = {
  onClose: () => void;
};

const NarrationsCloseButton: FC<NarrationCloseButtonProps> = ({ onClose }) => {

  return (
    <a
      href="#"
      onClick={() => {
        if (onClose) onClose();
      }}
      className="absolute left-4 top-2 z-10 bg-transparent p-2 text-white transition-colors hover:bg-black_bg hover:text-yellow_secondary md:left-16 md:top-4 md:p-5"
    >
      <span className="text-lg font-bold md:text-xl">X</span>
    </a>
  );
};

export default NarrationsCloseButton;
