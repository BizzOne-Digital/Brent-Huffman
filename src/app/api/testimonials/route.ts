import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Testimonial from "@/models/Testimonial";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
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
    const testimonial = await Testimonial.create(body);
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create testimonial" }, { status: 500 });
  }
}
