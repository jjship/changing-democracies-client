import React from "react";
import downloadImage from "./downloadImage";
import { Button } from "../../ui/button";
import { navButton } from "../classNames";

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
      className={navButton}
      size="lg"
    >
      Download
    </Button>
  );
};

export default DownloadButton;
