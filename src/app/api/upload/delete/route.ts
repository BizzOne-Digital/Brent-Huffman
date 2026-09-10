import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { deleteUploadByUrl } from "@/lib/upload";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url } = await request.json();
    if (url) await deleteUploadByUrl(url);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}
