export interface PageSection {
  key: string;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  order: number;
  extra?: Record<string, unknown>;
}

export interface ServiceDetailSection {
  key: string;
  title: string;
  content: string;
  image?: string;
  order: number;
}

export interface GalleryImage {
  url: string;
  caption?: string;
  order: number;
}

export interface SocialLinks {
  facebook?: string;
  facebookReel?: string;
  facebookPost?: string;
  googleReview?: string;
}

export interface SpecialOffers {
  seniors: string;
  lawEnforcement: string;
  military: string;
}

export const PAGE_SLUGS = [
  "home",
  "about",
  "services",
  "gallery",
  "testimonials",
  "faqs",
  "contact",
  "team",
] as const;

export type PageSlug = (typeof PAGE_SLUGS)[number];
