"use client";

const CloseButton = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    history.back();
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="absolute left-4 top-4 z-10 bg-transparent p-5 text-white transition-colors hover:bg-black hover:text-yellow_secondary"
    >
      <span className="text-xl font-bold">X</span>
    </a>
  );
};

export default CloseButton;
