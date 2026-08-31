import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import GalleryCategory from "@/models/GalleryCategory";
import GalleryClient from "./GalleryClient";
import { defaultGalleryCategories } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

async function getGalleryData() {
  try {
    await connectDB();
    const [page, categories] = await Promise.all([
      PageContent.findOne({ slug: "gallery" }).lean(),
      GalleryCategory.find().sort({ order: 1 }).lean(),
    ]);

    const dbCategories = categories ? JSON.parse(JSON.stringify(categories)) : [];
    const hasCompletedInstalls = dbCategories.some(
      (c: { slug: string }) => c.slug === "completed-installs"
    );
    const hasMedia = dbCategories.some(
      (c: { images?: { url: string }[] }) => (c.images?.length ?? 0) > 0
    );

    return {
      page: page ? JSON.parse(JSON.stringify(page)) : null,
      categories: hasMedia && hasCompletedInstalls ? dbCategories : defaultGalleryCategories,
    };
  } catch {
    return { page: null, categories: defaultGalleryCategories };
  }
}

export default async function GalleryPage() {
  const data = await getGalleryData();
  return <GalleryClient {...data} />;
}
