import { useFilmsContext } from "./FilmsContext";

const CloseButton = (
  props: { onClose: () => void },
  { style, next }: { style?: string; next?: string },
) => {
  const { onClose } = props;
  const { setNowPlaying } = useFilmsContext();

  const additionalStyles = style
    ? style
    : "text-white transition-colors  hover:bg-black hover:text-yellow_secondary";

  return (
    <a
      href="#"
      onClick={() => {
        setNowPlaying(null);
        return {
          onClose,
        };
      }}
      className={`absolute left-4 top-4 z-10 bg-transparent p-5 ${additionalStyles}`}
    >
      <span className="text-xl font-bold">X</span>
    </a>
  );
};

export default CloseButton;
