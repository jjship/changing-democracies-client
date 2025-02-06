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
    <div className={'border-l-8 border-b-8 min-h-[10vh] w-[18vw] border-b-purple_mains relative pl-[10vw] border-l-purple_mains'}>
    <Button
      onClick={() => onClick()}
      className="flex items-center rounded text-white transition-colors hover:text-yellow_secondary"
    >
      <p className={`my-8  bottom-[-8vh] absolute rounded bg-red_mains  font-bold md:text-xl transition-opacity duration-1000 ease-linear ${animate ? 'opacity-100' : 'opacity-0'}`}>
        {title}
      </p>
      {/*<div className="absolute right-3 h-0 w-0 border-b-[20px] border-l-[20px] border-t-[20px] border-b-transparent border-l-purple_mains border-t-transparent" />*/}
    </Button>
    </div>
  );
};
export default SwitchPathRedirectButton;
