import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ folder: string; filename: string }> }
) {
  const { folder, filename } = await params;

  if (!filename || filename.includes("..") || filename.includes("/")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  try {
    await connectDB();
    const upload = await StoredUpload.findOne({ folder, filename });

    if (!upload) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(upload.data), {
      status: 200,
      headers: {
        "Content-Type": upload.mimeType,
        "Content-Length": upload.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Serve upload error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
