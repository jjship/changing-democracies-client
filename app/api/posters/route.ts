import "server-only";
import { NextResponse } from "next/server";
import { getPostersMetadata } from "@/utils/posters-methods";

export async function GET() {
  const postersRes = await getPostersMetadata();
  if (!postersRes.success) {
    return NextResponse.json(
      { error: postersRes.error?.message },
      { status: postersRes.error?.status || 500 },
    );
  }

  return NextResponse.json(postersRes.data, { status: 200 });
}
