import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import FAQ from "@/models/FAQ";
import GalleryCategory from "@/models/GalleryCategory";
import Lead from "@/models/Lead";
import PageContent from "@/models/PageContent";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAuth();
  if (!auth) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const [services, testimonials, faqs, gallery, leads, pages] = await Promise.all([
      Service.countDocuments(),
      Testimonial.countDocuments(),
      FAQ.countDocuments(),
      GalleryCategory.countDocuments(),
      Lead.countDocuments({ status: "new" }),
      PageContent.countDocuments(),
    ]);

    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);

    return NextResponse.json({
      success: true,
      data: {
        counts: { services, testimonials, faqs, gallery, leads, pages },
        recentLeads,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 });
  }
}
