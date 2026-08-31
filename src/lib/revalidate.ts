import { revalidatePath } from "next/cache";

const PAGE_PATHS: Record<string, string[]> = {
  home: ["/"],
  about: ["/about"],
  services: ["/services"],
  gallery: ["/gallery"],
  testimonials: ["/testimonials"],
  faqs: ["/faqs"],
  contact: ["/contact"],
  team: ["/team"],
};

export function revalidatePage(slug: string) {
  const paths = PAGE_PATHS[slug] || [`/${slug}`];
  for (const path of paths) {
    revalidatePath(path);
  }
}

export function revalidateService(slug: string) {
  revalidatePath("/services");
  revalidatePath(`/services/${slug}`);
  revalidatePath("/");
}

export function revalidateSite() {
  revalidatePath("/", "layout");
}
