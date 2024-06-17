import { FC } from "react";
import { Button } from "@/ui/button";
import { useBoothContext } from "./BoothContext";

type BackProps = {
  nextStage?: number;
};

const BackBtn: FC<BackProps> = ({ nextStage }) => {
  const { setStage, stage } = useBoothContext();

  const handleClick = () => {
    if (nextStage !== undefined) {
      setStage(nextStage);
      return;
    }
    setStage((prev) => prev - 1);
  };

  return (
    <Button
      className={`absolute left-5 top-5 bg-darkRed p-6 text-2xl hover:bg-pink`}
      onClick={handleClick}
    >
      Go Back
    </Button>
  );
};

export default BackBtn;
