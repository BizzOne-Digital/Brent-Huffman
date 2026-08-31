import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import GalleryCategory from "@/models/GalleryCategory";
import { slugify } from "@/lib/seed-data";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const categories = await GalleryCategory.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    await connectDB();
    const slug = body.slug || slugify(body.name);
    const category = await GalleryCategory.create({ ...body, slug, images: [] });
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 500 });
  }
}
