import axios from "axios";

interface DownloadButtonProps {
  imageUrl: string;
  fileName: string;
}

const downloadImage = async ({ imageUrl, fileName }: DownloadButtonProps) => {
  console.log({ imageUrl, fileName });
  try {
    const response = await axios.get(
      `/api/downloadImage?url=${encodeURIComponent(imageUrl)}`,
      {
        responseType: "blob",
      },
    );
    const urlCreator = window.URL || window.webkitURL;
    const imageLink = urlCreator.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = imageLink;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading the image", error);
  }
};

export default downloadImage;
