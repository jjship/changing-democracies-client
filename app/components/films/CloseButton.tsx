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
      className={`hover:text-yellow_secondary" absolute left-4 top-4 z-10 bg-transparent p-5 text-white  transition-colors hover:bg-black_bg`}
    >
      <span className="text-xl font-bold">X</span>
    </a>
  );
};

export default CloseButton;
