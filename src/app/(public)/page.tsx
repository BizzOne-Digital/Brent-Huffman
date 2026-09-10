import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import Service from "@/models/Service";
import SiteSettings from "@/models/SiteSettings";
import HomeClient from "./HomeClient";
import { defaultServices } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

async function getHomeData() {
  try {
    await connectDB();
    const [page, services, settings] = await Promise.all([
      PageContent.findOne({ slug: "home" }).lean(),
      Service.find({ isActive: true }).sort({ order: 1 }).limit(6).lean(),
      SiteSettings.findOne().lean(),
    ]);
    const dbServices = services ? JSON.parse(JSON.stringify(services)) : [];
    const hasUpdatedServices = dbServices.some(
      (s: { slug: string }) =>
        s.slug === "gas-furnaces" || s.slug === "gas-packs" || s.slug === "metal-ductwork"
    );
    return {
      page: page ? JSON.parse(JSON.stringify(page)) : null,
      services: hasUpdatedServices
        ? dbServices
        : defaultServices.slice(0, 6).map((s) => ({ ...s, _id: s.slug, isActive: true })),
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
    };
  } catch {
    return {
      page: null,
      services: defaultServices.slice(0, 6).map((s) => ({ ...s, _id: s.slug, isActive: true })),
      settings: null,
    };
  }
}

export default async function HomePage() {
  const data = await getHomeData();
  return <HomeClient {...data} />;
}
