import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import Testimonial from "@/models/Testimonial";
import TestimonialsClient from "./TestimonialsClient";

async function getTestimonialsData() {
  try {
    await connectDB();
    const [page, testimonials] = await Promise.all([
      PageContent.findOne({ slug: "testimonials" }).lean(),
      Testimonial.find({ isActive: true }).sort({ order: 1 }).lean(),
    ]);
    return {
      page: page ? JSON.parse(JSON.stringify(page)) : null,
      testimonials: testimonials ? JSON.parse(JSON.stringify(testimonials)) : [],
    };
  } catch {
    return { page: null, testimonials: [] };
  }
}

export default async function TestimonialsPage() {
  const data = await getTestimonialsData();
  return <TestimonialsClient {...data} />;
}
