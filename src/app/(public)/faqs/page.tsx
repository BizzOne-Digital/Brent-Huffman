import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import FAQ from "@/models/FAQ";
import FAQsClient from "./FAQsClient";

async function getFAQsData() {
  try {
    await connectDB();
    const [page, faqs] = await Promise.all([
      PageContent.findOne({ slug: "faqs" }).lean(),
      FAQ.find({ isActive: true }).sort({ order: 1 }).lean(),
    ]);
    return {
      page: page ? JSON.parse(JSON.stringify(page)) : null,
      faqs: faqs ? JSON.parse(JSON.stringify(faqs)) : [],
    };
  } catch {
    return { page: null, faqs: [] };
  }
}

export default async function FAQsPage() {
  const data = await getFAQsData();
  return <FAQsClient {...data} />;
}
