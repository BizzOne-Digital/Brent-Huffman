import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";
import { defaultServices } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

async function getService(slug: string) {
  try {
    await connectDB();
    const [service, allServices] = await Promise.all([
      Service.findOne({ slug, isActive: true }).lean(),
      Service.find({ isActive: true, slug: { $ne: slug } }).sort({ order: 1 }).lean(),
    ]);

    let resolvedService = service ? JSON.parse(JSON.stringify(service)) : null;
    let resolvedRelated = allServices ? JSON.parse(JSON.stringify(allServices)) : [];

    if (!resolvedService) {
      const fallback = defaultServices.find((s) => s.slug === slug);
      if (fallback) {
        resolvedService = { ...fallback, _id: fallback.slug, isActive: true };
        resolvedRelated = defaultServices
          .filter((s) => s.slug !== slug)
          .map((s) => ({ ...s, _id: s.slug, isActive: true }));
      }
    } else {
      const fallback = defaultServices.find((s) => s.slug === slug);
      if (fallback) {
        const usesLegacyImages =
          resolvedService.mainImage?.includes("hero-bg.png") ||
          resolvedService.mainImage?.includes("placeholder");
        const hasStaleSections =
          (resolvedService.detailSections?.length ?? 0) < fallback.detailSections.length;
        if (usesLegacyImages || hasStaleSections) {
          resolvedService = {
            ...resolvedService,
            ...fallback,
            _id: resolvedService._id,
            detailSections: fallback.detailSections,
            features: fallback.features,
          };
        }
      }
    }

    if (!resolvedRelated.length) {
      resolvedRelated = defaultServices
        .filter((s) => s.slug !== slug)
        .map((s) => ({ ...s, _id: s.slug, isActive: true }));
    }

    return { service: resolvedService, relatedServices: resolvedRelated };
  } catch {
    const fallback = defaultServices.find((s) => s.slug === slug);
    if (!fallback) return { service: null, relatedServices: [] };
    return {
      service: { ...fallback, _id: fallback.slug, isActive: true },
      relatedServices: defaultServices
        .filter((s) => s.slug !== slug)
        .map((s) => ({ ...s, _id: s.slug, isActive: true })),
    };
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { service, relatedServices } = await getService(slug);
  if (!service) notFound();
  return <ServiceDetailClient service={service} relatedServices={relatedServices} />;
}
