import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { clientEnv, serverEnv } from "@/utils/env";
import { hasKioskOrAdminAccess } from "@/utils/admin/access";
import { parsePosterUrl } from "@/utils/admin/poster-file-name";

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

const bodySchema = z.object({
  body: z.object({
    imageUrl: z.string().url(),
    // Kept for backwards compatibility with existing callers; the attachment
    // name is always derived from the validated poster URL.
    fileName: z.string().optional(),
    email: z.string().email(),
  }),
});

export async function POST(request: NextRequest) {
  if (!(await hasKioskOrAdminAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  const { imageUrl, email } = parsed.data.body;

  const poster = parsePosterUrl(
    imageUrl,
    clientEnv().NEXT_PUBLIC_STORAGE_PULL_ZONE,
  );
  if (!poster) {
    return NextResponse.json(
      { error: "Image URL not allowed" },
      { status: 403 },
    );
  }

  try {
    const imageResponse = await fetch(poster.url);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 502 },
      );
    }

    const contentType = imageResponse.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      return NextResponse.json({ error: "Not an image" }, { status: 502 });
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    if (imageBuffer.byteLength > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "Image too large" }, { status: 413 });
    }

    const resend = new Resend(serverEnv().RESEND_API_KEY);

    await resend.emails.send({
      from: "Changing Democracies <posters@cd-admin.ovh>",
      to: [email],
      subject: "Your Changing Democracies Poster",
      text: "Find your poster attached",
      attachments: [{ filename: poster.fileName, content: imageBuffer }],
    });

    return new NextResponse("ok");
  } catch (error) {
    return NextResponse.json(
      { error: "Error sending image" },
      { status: 500 },
    );
  }
}
