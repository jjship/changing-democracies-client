import React from "react";
import downloadImage from "./downloadImage";
import { Button } from "../../ui/button";

interface DownloadButtonProps {
  imageUrl: string;
  fileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  imageUrl,
  fileName,
}) => {
  return (
    <Button
      onClick={() => downloadImage({ imageUrl, fileName })}
      className="w-36 bg-green_accent text-black_bg hover:bg-yellow_secondary"
    >
      download
    </Button>
  );
};

export default DownloadButton;
