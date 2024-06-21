import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const json = await request.json();
  const { imageUrl, fileName, email } = json.body;

  if (!imageUrl || !email) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const resendRes = await resend.emails.send({
      from: "Changing Democracies <posters@cd-admin.ovh>",
      to: [email],
      subject: "Your Changing Democracies Poster",
      text: "Find your poster attached",
      attachments: [{ filename: fileName, content: response.data }],
    });

    return new NextResponse("ok");
  } catch (error) {
    return NextResponse.json({ error: "Error sending image" }, { status: 500 });
  }
}
