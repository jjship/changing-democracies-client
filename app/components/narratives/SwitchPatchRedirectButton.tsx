import { FC } from "react";
import { Button } from "@radix-ui/themes";

type SwitchPathRedirectButtonProps = {
  onClick: () => void;
  title: string;
  id: string;
};

const SwitchPathRedirectButton: FC<SwitchPathRedirectButtonProps> = ({
  onClick,
  title,
}) => {
  return (
    <Button
      onClick={() => onClick()}
      className="text-white transition-colors hover:text-yellow_secondary"
    >
      <p className="my-2 bg-red_mains p-2  text-lg font-bold md:text-xl">
        {title}
      </p>
    </Button>
  );
};

export default SwitchPathRedirectButton;
