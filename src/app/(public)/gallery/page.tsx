import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import GalleryCategory from "@/models/GalleryCategory";
import GalleryClient from "./GalleryClient";
import { defaultGalleryCategories } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

type GalleryCategoryData = {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  images: { url: string; caption?: string; order: number }[];
};

function mergeGalleryCategories(
  dbCategories: GalleryCategoryData[],
  defaults: typeof defaultGalleryCategories
): GalleryCategoryData[] {
  const merged =
    dbCategories.length > 0
      ? dbCategories.map((c) => ({ ...c }))
      : defaults.map((c) => ({ ...c }));

  for (const def of defaults) {
    const idx = merged.findIndex((c) => c.slug === def.slug);
    if (idx === -1) {
      merged.push({ ...def });
      continue;
    }
    const dbImageCount = merged[idx].images?.length ?? 0;
    const defaultImageCount = def.images?.length ?? 0;
    if (defaultImageCount > dbImageCount) {
      merged[idx] = {
        ...merged[idx],
        name: def.name,
        description: def.description,
        order: def.order,
        images: def.images,
      };
    }
  }

  return merged.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

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

    const categoriesOut =
      hasMedia && hasCompletedInstalls
        ? mergeGalleryCategories(dbCategories, defaultGalleryCategories)
        : defaultGalleryCategories;

    return {
      page: page ? JSON.parse(JSON.stringify(page)) : null,
      categories: categoriesOut,
    };
  } catch {
    return { page: null, categories: defaultGalleryCategories };
  }
}

export default async function GalleryPage() {
  const data = await getGalleryData();
  return <GalleryClient {...data} />;
}
