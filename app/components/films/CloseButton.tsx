"use client";

import { useRouter } from "next/navigation";

const CloseButton = ({ style, next }: { style?: string; next?: string }) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    next ? router.push(next) : history.back();
  };

  const additionalStyles = style
    ? style
    : "text-white transition-colors  hover:bg-black hover:text-yellow_secondary";

  return (
    <a
      href="#"
      onClick={handleClick}
      className={`absolute left-4 top-4 z-10 bg-transparent p-5 ${additionalStyles}`}
    >
      <span className="text-xl font-bold">X</span>
    </a>
  );
};

export default CloseButton;
