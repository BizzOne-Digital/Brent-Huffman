import { connectDB } from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import AboutClient from "./AboutClient";
import {
  defaultPages,
  aboutExtraVideos,
  helpfulInfoVideos,
} from "@/lib/seed-data";
import { PageSection } from "@/lib/types";

export const dynamic = "force-dynamic";

function mergeAboutPage(page: { sections: PageSection[] } | null) {
  const defaultAbout = defaultPages.find((p) => p.slug === "about");
  if (!defaultAbout) return page;

  const sections = page?.sections?.length
    ? page.sections.map((section) => ({ ...section }))
    : defaultAbout.sections.map((section) => ({ ...section }));

  const defaultHelpful = defaultAbout.sections.find((s) => s.key === "helpful-videos");
  const helpfulIdx = sections.findIndex((s) => s.key === "helpful-videos");
  if (defaultHelpful && helpfulIdx === -1) {
    sections.push({ ...defaultHelpful });
  } else if (defaultHelpful && helpfulIdx >= 0) {
    sections[helpfulIdx] = {
      ...sections[helpfulIdx],
      title: defaultHelpful.title,
      subtitle: defaultHelpful.subtitle,
      content: defaultHelpful.content,
      extra: { videos: [...helpfulInfoVideos] },
    };
  }

  const videoIdx = sections.findIndex((s) => s.key === "video");
  if (videoIdx >= 0) {
    sections[videoIdx] = {
      ...sections[videoIdx],
      extra: {
        ...(sections[videoIdx].extra || {}),
        extraVideos: [...aboutExtraVideos],
      },
    };
  }

  return {
    ...(page || { slug: "about", title: defaultAbout.title }),
    sections: sections.sort((a, b) => a.order - b.order),
  };
}

async function getAboutData() {
  try {
    await connectDB();
    const page = await PageContent.findOne({ slug: "about" }).lean();
    const parsed = page ? JSON.parse(JSON.stringify(page)) : null;
    return { page: mergeAboutPage(parsed) };
  } catch {
    return { page: mergeAboutPage(null) };
  }
}

export default async function AboutPage() {
  const { page } = await getAboutData();
  return <AboutClient page={page} />;
}
