import { FC } from "react";

type SwitchPathButtonProps = {
  onClick: () => void;
};

const SwitchPathButton: FC<SwitchPathButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-t-sm bg-[#b85252] px-4 py-4 w-[10vw] font-bold text-white shadow focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      switch path
    </button>
  );
};

export default SwitchPathButton;