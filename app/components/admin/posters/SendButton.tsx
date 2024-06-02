import React from "react";
import { Button } from "../../ui/button";
import sendImage from "./sendImage";

export type SendButtonProps = {
  imageUrl: string;
  fileName: string;
  email: string;
};

const SendButton: React.FC<SendButtonProps> = ({
  imageUrl,
  fileName,
  email,
}) => {
  return (
    <Button
      onClick={() => sendImage({ imageUrl, fileName, email })}
      className="w-36 bg-green_accent text-black_bg hover:bg-yellow_secondary"
    >
      send e-mail
    </Button>
  );
};

export default SendButton;
