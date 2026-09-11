import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import PageContent from "@/models/PageContent";
import { revalidatePage } from "@/lib/revalidate";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    const page = await PageContent.findOne({ slug });
    if (!page) {
      return NextResponse.json({ success: false, error: "Page not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch page" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const auth = await requireAuth(request);
  if (!auth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const body = await request.json();
    await connectDB();
    const page = await PageContent.findOneAndUpdate(
      { slug },
      {
        $set: {
          title: body.title,
          sections: body.sections,
        },
      },
      { new: true, runValidators: true }
    );
    if (!page) {
      return NextResponse.json({ success: false, error: "Page not found" }, { status: 404 });
    }
    revalidatePage(slug);
    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("Page update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update page" }, { status: 500 });
  }
}
