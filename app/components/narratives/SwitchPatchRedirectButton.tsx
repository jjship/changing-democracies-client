import { FC } from "react";
import { Button } from "@radix-ui/themes";

type SwitchPathRedirectButtonProps = {
  onClick: () => void;
  title: string;
  id: string;
  specialWord?: string;
  animate?: boolean;
};
const SwitchPathRedirectButton: FC<SwitchPathRedirectButtonProps> = ({
  onClick,
  title,
  animate
}) => {
  return (
    <Button
      onClick={() => onClick()}
      className=" flex  items-center rounded text-white transition-colors hover:text-yellow_secondary"
    >
      <p className={`my-2 w-[15vw] rounded bg-red_mains p-2 pr-12 font-bold md:text-xl transition-opacity duration-1000 ease-linear ${animate ? 'opacity-100' : 'opacity-0'}`}>
        {title}
      </p>
      <div className="absolute right-3 h-0 w-0 border-b-[20px] border-l-[20px] border-t-[20px] border-b-transparent border-l-purple_mains border-t-transparent" />
    </Button>
  );
};
export default SwitchPathRedirectButton;
