import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const headers = new Headers();
    headers.set("Content-Type", response.headers["content-type"]);
    headers.set(
      "Content-Disposition",
      'attachment; filename="downloadedImage.jpg"',
    );

    return new NextResponse(response.data, { headers });
  } catch (error) {
    return NextResponse.json(
      { error: "Error downloading image" },
      { status: 500 },
    );
  }
}
