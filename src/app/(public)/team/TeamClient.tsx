"use client";

import HeroSection from "@/components/ui/HeroSection";
import FadeIn from "@/components/ui/FadeIn";
import SafeImage from "@/components/ui/SafeImage";
import Button from "@/components/ui/Button";
import { PageSection } from "@/lib/types";
import { Users, Award, Heart } from "lucide-react";

function getSection(sections: PageSection[], key: string) {
  return sections.find((s) => s.key === key);
}

export default function TeamClient({ page }: { page: { sections: PageSection[] } | null }) {
  const sections = page?.sections || [];
  const hero = getSection(sections, "hero");
  const teamPhoto = getSection(sections, "team-photo");

  return (
    <>
      <HeroSection
        title={hero?.title || "Meet Our Team"}
        subtitle={hero?.subtitle || "The People Behind Your Comfort"}
        content={hero?.content}
        image={hero?.image}
      />

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <SafeImage
                  src={teamPhoto?.image || "/images/team.jpg"}
                  alt="Huffman Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <span className="text-huffman-red font-bold text-sm tracking-widest uppercase">
                {teamPhoto?.subtitle || "Serving Since 1962"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-huffman-dark mt-3 mb-4 sm:mb-6">
                {teamPhoto?.title || "Family Owned & Operated"}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                {teamPhoto?.content ||
                  "Brent Huffman and the Huffman team bring decades of experience and a personal touch to every job."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {[
                  { icon: Users, label: "Expert Team" },
                  { icon: Award, label: "60+ Years" },
                  { icon: Heart, label: "Family Values" },
                ].map((item) => (
                  <div key={item.label} className="text-center p-4 bg-huffman-gray rounded-xl">
                    <item.icon className="w-8 h-8 mx-auto mb-2 text-huffman-blue" />
                    <p className="text-xs sm:text-sm font-bold text-huffman-dark">{item.label}</p>
                  </div>
                ))}
              </div>
              <Button href="/contact" variant="primary">Work With Us</Button>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
