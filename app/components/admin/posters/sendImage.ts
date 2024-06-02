import axios from "axios";
import { SendButtonProps } from "./SendButton";

const sendImage = async ({ imageUrl, fileName, email }: SendButtonProps) => {
  try {
    await axios.post(`/api/sendImage`, {
      body: { imageUrl, fileName, email },
    });
  } catch (error) {
    console.error("Error sending the image", error);
  }
};

export default sendImage;
