"use client";

import Link from "next/link";
import { Info, Play } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { helpfulInfoVideos } from "@/lib/seed-data";

type HelpfulVideosSectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  videos?: string[];
};

export default function HelpfulVideosSection({
  id = "helpful-videos",
  title = "Helpful Videos & Information",
  subtitle = "Tips From Huffman Heating",
  content = "Short videos with helpful information about your heating and air conditioning system.",
  videos,
}: HelpfulVideosSectionProps) {
  const list = videos?.filter(Boolean) ?? [...helpfulInfoVideos];
  if (list.length === 0) return null;

  return (
    <section id={id} className="section-padding bg-white scroll-mt-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-huffman-blue font-bold text-sm tracking-widest uppercase mb-3">
            <Info size={16} />
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-huffman-dark mt-2 mb-4">{title}</h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">{content}</p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {list.map((src, i) => (
            <FadeIn key={src} delay={0.1 + i * 0.08}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black aspect-video">
                <video
                  src={src}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain bg-black"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HelpfulVideosNavLink({ className }: { className?: string }) {
  return (
    <Link
      href="/services/system-troubles#helpful-videos"
      className={
        className ??
        "inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-huffman-blue/10 text-huffman-blue font-bold text-sm hover:bg-huffman-blue/20 transition-colors"
      }
    >
      <Play size={16} />
      Watch Helpful Videos
    </Link>
  );
}
