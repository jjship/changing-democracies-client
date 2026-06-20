import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

const querySchema = z.object({
  url: z.string().url(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({ url: searchParams.get("url") });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid or missing URL parameter" },
      { status: 400 },
    );
  }

  const imageUrl = parsed.data.url;

  if (!isAllowedUrl(imageUrl)) {
    return NextResponse.json(
      { error: "URL not allowed" },
      { status: 403 },
    );
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 502 },
      );
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const data = await response.arrayBuffer();

    return new NextResponse(data, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": 'attachment; filename="downloadedImage.jpg"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error downloading image" },
      { status: 500 },
    );
  }
}
