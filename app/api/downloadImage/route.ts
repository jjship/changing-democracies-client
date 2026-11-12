import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { clientEnv } from "@/utils/env";
import { hasKioskOrAdminAccess } from "@/utils/admin/access";
import { parsePosterUrl } from "@/utils/admin/poster-file-name";

const querySchema = z.object({
  url: z.string().url(),
});

export async function GET(request: NextRequest) {
  if (!(await hasKioskOrAdminAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({ url: searchParams.get("url") });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid or missing URL parameter" },
      { status: 400 },
    );
  }

  const poster = parsePosterUrl(
    parsed.data.url,
    clientEnv().NEXT_PUBLIC_STORAGE_PULL_ZONE,
  );
  if (!poster) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }

  try {
    const response = await fetch(poster.url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 502 },
      );
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) {
      return NextResponse.json({ error: "Not an image" }, { status: 502 });
    }

    const data = await response.arrayBuffer();

    return new NextResponse(data, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${poster.fileName}"`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error downloading image" },
      { status: 500 },
    );
  }
}
