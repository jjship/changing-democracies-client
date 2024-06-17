import { FC } from "react";
import { Button } from "@/ui/button";
import { useBoothContext } from "./BoothContext";
import backArrow from "@/public/back_arrow.svg";
import Image from "next/image";

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
      className={`absolute left-5 top-10 bg-transparent hover:bg-transparent`}
      onClick={handleClick}
    >
      <Image
        src={backArrow}
        alt="image with earshaped arrows"
        // className="mx-auto max-w-[24rem] pt-10"
      />
    </Button>
  );
};

export default BackBtn;
