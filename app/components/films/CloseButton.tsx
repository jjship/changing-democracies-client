import { useFilmsContext } from "./FilmsContext";

const CloseButton = (props: { onClose?: () => void }) => {
  const { onClose } = props;
  const { setNowPlaying } = useFilmsContext();

  return (
    <a
      href="#"
      onClick={() => {
        setNowPlaying(null);
        if (onClose) onClose();
      }}
      className={`absolute right-4 top-4 z-10 bg-transparent p-5 text-white transition-colors hover:bg-black_bg hover:text-yellow_secondary`}
    >
      <span className="text-xl font-bold">X</span>
    </a>
  );
};

export default CloseButton;
