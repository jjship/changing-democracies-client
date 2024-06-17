import { FC } from "react";
import { Button } from "@/ui/button";
import { useBoothContext } from "./BoothContext";

const BackBtn: FC = () => {
  const { setStage, stage } = useBoothContext();

  const handleClick = () => {
    setStage((prev) => prev - 1);
  };

  return (
    <Button
      className={`absolute left-5 top-5 bg-darkRed p-6 text-[24px] hover:bg-pink`}
      onClick={handleClick}
    >
      Go Back
    </Button>
  );
};

export default BackBtn;
