import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import {
  UPLOAD_FOLDERS,
  ALLOWED_MIME_TYPES,
  MAX_UPLOAD_SIZE,
  generateFilename,
  getExtFromMime,
} from "@/lib/upload";
import StoredUpload from "@/models/StoredUpload";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string | null;

    if (!file || !folder) {
      return NextResponse.json(
        { success: false, error: "File and folder required" },
        { status: 400 }
      );
    }

    if (!UPLOAD_FOLDERS.includes(folder as (typeof UPLOAD_FOLDERS)[number])) {
      return NextResponse.json(
        { success: false, error: "Invalid folder" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Allowed: jpeg, png, webp, gif" },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json(
        { success: false, error: "File too large. Max 8MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = getExtFromMime(file.type);
    const filename = generateFilename(ext);

    await connectDB();
    await StoredUpload.create({
      folder,
      filename,
      mimeType: file.type,
      size: file.size,
      data: buffer,
    });

    const url = `/api/uploads/${folder}/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      filename,
      size: file.size,
      folder,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
