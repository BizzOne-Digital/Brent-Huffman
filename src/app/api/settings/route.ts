import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import SiteSettings from "@/models/SiteSettings";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    await connectDB();
    const settings = await SiteSettings.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}
