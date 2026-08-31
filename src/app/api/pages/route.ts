import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import PageContent from "@/models/PageContent";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const pages = await PageContent.find().sort({ slug: 1 });
    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug, title, sections } = await request.json();
    await connectDB();
    const page = await PageContent.findOneAndUpdate(
      { slug },
      { title, sections },
      { new: true, upsert: true }
    );
    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update page" }, { status: 500 });
  }
}
