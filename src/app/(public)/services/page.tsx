import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import Service from "@/models/Service";
import ServicesClient from "./ServicesClient";
import { defaultServices } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

async function getServicesData() {
  try {
    await connectDB();
    const [page, services] = await Promise.all([
      PageContent.findOne({ slug: "services" }).lean(),
      Service.find({ isActive: true }).sort({ order: 1 }).lean(),
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
        : defaultServices.map((s) => ({ ...s, _id: s.slug, isActive: true })),
    };
  } catch {
    return {
      page: null,
      services: defaultServices.map((s) => ({ ...s, _id: s.slug, isActive: true })),
    };
  }
}

export default async function ServicesPage() {
  const data = await getServicesData();
  return <ServicesClient {...data} />;
}
