import { SendButtonProps } from "./SendButton";

const sendImage = async ({ imageUrl, fileName, email }: SendButtonProps) => {
  try {
    const response = await fetch(`/api/sendImage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: { imageUrl, fileName, email } }),
    });

    if (!response.ok) {
      throw new Error(`Send failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error sending the image", error);
  }
};

export default sendImage;
