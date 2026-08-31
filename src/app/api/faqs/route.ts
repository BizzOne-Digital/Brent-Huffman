import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import FAQ from "@/models/FAQ";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json({ success: true, data: faqs });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch FAQs" }, { status: 500 });
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
    const faq = await FAQ.create(body);
    return NextResponse.json({ success: true, data: faq });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create FAQ" }, { status: 500 });
  }
}
