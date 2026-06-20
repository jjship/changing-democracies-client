import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { serverEnv } from "@/utils/env";

const ALLOWED_HOSTS = [
  "b-cdn.net",
  "bunnycdn.com",
  "changingdemocracies.eu",
];

function isAllowedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_HOSTS.some(
      (host) =>
        parsed.hostname === host || parsed.hostname.endsWith(`.${host}`),
    );
  } catch {
    return false;
  }
}

const bodySchema = z.object({
  body: z.object({
    imageUrl: z.string().url(),
    fileName: z.string().min(1),
    email: z.string().email(),
  }),
});

export async function POST(request: NextRequest) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { imageUrl, fileName, email } = parsed.data.body;

  if (!isAllowedUrl(imageUrl)) {
    return NextResponse.json(
      { error: "Image URL not allowed" },
      { status: 403 },
    );
  }

  try {
    const resend = new Resend(serverEnv().RESEND_API_KEY);

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 502 },
      );
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    await resend.emails.send({
      from: "Changing Democracies <posters@cd-admin.ovh>",
      to: [email],
      subject: "Your Changing Democracies Poster",
      text: "Find your poster attached",
      attachments: [{ filename: fileName, content: imageBuffer }],
    });

    return new NextResponse("ok");
  } catch (error) {
    return NextResponse.json(
      { error: "Error sending image" },
      { status: 500 },
    );
  }
}
