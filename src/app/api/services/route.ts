import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Service from "@/models/Service";
import { slugify } from "@/lib/seed-data";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const auth = await requireAuth(request);
    const filter = auth ? {} : { isActive: true };
    const services = await Service.find(filter).sort({ order: 1 });
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 });
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
    const slug = body.slug || slugify(body.title);
    const service = await Service.create({ ...body, slug });
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 500 });
  }
}
