import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import GalleryCategory from "@/models/GalleryCategory";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const category = await GalleryCategory.findOne({
      $or: [{ _id: id }, { slug: id }],
    });
    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch category" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();
    const category = await GalleryCategory.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();
    await GalleryCategory.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete category" }, { status: 500 });
  }
}
