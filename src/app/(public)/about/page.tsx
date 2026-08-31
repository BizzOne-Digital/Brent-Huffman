import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import AboutClient from "./AboutClient";

export const dynamic = "force-dynamic";

async function getAboutData() {
  try {
    await connectDB();
    const page = await PageContent.findOne({ slug: "about" }).lean();
    return { page: page ? JSON.parse(JSON.stringify(page)) : null };
  } catch {
    return { page: null };
  }
}

export default async function AboutPage() {
  const { page } = await getAboutData();
  return <AboutClient page={page} />;
}
