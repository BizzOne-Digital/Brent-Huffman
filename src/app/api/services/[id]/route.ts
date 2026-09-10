import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Service from "@/models/Service";
import { revalidateService } from "@/lib/revalidate";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const service = await Service.findOne({
      $or: [{ _id: id }, { slug: id }],
    });
    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch service" }, { status: 500 });
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
    const service = await Service.findByIdAndUpdate(
      id,
      {
        $set: {
          title: body.title,
          slug: body.slug,
          shortDescription: body.shortDescription,
          mainImage: body.mainImage,
          icon: body.icon,
          features: body.features,
          detailSections: body.detailSections,
          order: body.order,
          isActive: body.isActive,
        },
      },
      { new: true, runValidators: true }
    );
    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }
    revalidateService(service.slug);
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error("Service update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update service" }, { status: 500 });
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
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete service" }, { status: 500 });
  }
}
