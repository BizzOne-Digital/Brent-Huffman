import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import SiteSettings from "@/models/SiteSettings";
import ContactClient from "./ContactClient";

async function getContactData() {
  try {
    await connectDB();
    const [page, settings] = await Promise.all([
      PageContent.findOne({ slug: "contact" }).lean(),
      SiteSettings.findOne().lean(),
    ]);
    return {
      page: page ? JSON.parse(JSON.stringify(page)) : null,
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
    };
  } catch {
    return { page: null, settings: null };
  }
}

export default async function ContactPage() {
  const data = await getContactData();
  return <ContactClient {...data} />;
}
