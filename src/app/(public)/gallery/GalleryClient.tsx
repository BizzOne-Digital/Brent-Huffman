"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Play } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import FadeIn from "@/components/ui/FadeIn";
import SafeImage from "@/components/ui/SafeImage";
import { PageSection } from "@/lib/types";

function getSection(sections: PageSection[], key: string) {
  return sections.find((s) => s.key === key);
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

interface GalleryItem {
  url: string;
  caption?: string;
  order: number;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  images: GalleryItem[];
}

export default function GalleryClient({
  page,
  categories,
}: {
  page: { sections: PageSection[] } | null;
  categories: Category[];
}) {
  const hero = getSection(page?.sections || [], "hero");
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug || "");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const currentCategory = categories.find((c) => c.slug === activeCategory);
  const allItems = currentCategory?.images?.sort((a, b) => a.order - b.order) || [];

  return (
    <>
      <HeroSection
        title={hero?.title || "Our Work Gallery"}
        subtitle={hero?.subtitle || "See the Quality We Deliver"}
        content={hero?.content}
        image={hero?.image}
      />

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {categories.length > 0 && (
            <FadeIn>
              <div className="flex flex-wrap justify-center gap-3 mb-8 sm:mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat._id || cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all ${
                      activeCategory === cat.slug
                        ? "shimmer-btn text-white shadow-md"
                        : "bg-huffman-gray text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                    <span className="ml-1.5 opacity-70">({cat.images?.length || 0})</span>
                  </button>
                ))}
              </div>
            </FadeIn>
          )}

          {allItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {allItems.map((item, i) => {
                const isVideo = isVideoUrl(item.url);
                return (
                  <FadeIn key={`${item.url}-${i}`} delay={i * 0.03}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-md bg-huffman-dark"
                      onClick={() => setLightbox(item)}
                    >
                      {isVideo ? (
                        <>
                          <video
                            src={item.url}
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                              <Play size={22} className="text-huffman-red ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <SafeImage src={item.url} alt={item.caption || "Gallery"} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 group-active:bg-black/40 transition-all flex items-center justify-center">
                            <ZoomIn className="text-white opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" size={28} />
                          </div>
                        </>
                      )}
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/70 to-transparent">
                          <p className="text-white text-xs font-medium line-clamp-2">{item.caption}</p>
                        </div>
                      )}
                    </motion.div>
                  </FadeIn>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Gallery images coming soon!</p>
              <p className="text-gray-300 text-sm mt-2">Check back for photos of our work</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center min-h-11 min-w-11 text-white hover:text-huffman-red transition-colors rounded-full bg-white/10 z-10"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideoUrl(lightbox.url) ? (
                <video
                  src={lightbox.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[80vh] rounded-xl bg-black"
                />
              ) : (
                <SafeImage
                  src={lightbox.url}
                  alt={lightbox.caption || "Gallery"}
                  width={1200}
                  height={800}
                  className="w-full h-full object-contain rounded-xl"
                />
              )}
              {lightbox.caption && (
                <p className="text-white text-center mt-4 text-base sm:text-lg">{lightbox.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
