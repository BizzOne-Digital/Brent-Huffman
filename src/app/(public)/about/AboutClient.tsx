"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Heart, Award, Play, Info } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import SafeImage from "@/components/ui/SafeImage";
import { aboutExtraVideos, helpfulInfoVideos } from "@/lib/seed-data";
import { PageSection } from "@/lib/types";

function getSection(sections: PageSection[], key: string) {
  return sections.find((s) => s.key === key);
}

export default function AboutClient({ page }: { page: { sections: PageSection[] } | null }) {
  const sections = page?.sections || [];
  const hero = getSection(sections, "hero");
  const story = getSection(sections, "story");
  const video = getSection(sections, "video");
  const helpfulVideosSection = getSection(sections, "helpful-videos");
  const serviceArea = getSection(sections, "service-area");

  const storyImage = story?.image || "/images/about-family.png";
  const videoUrl =
    (video?.extra as { videoUrl?: string })?.videoUrl || "/videos/about-video.mp4";
  const extraVideos =
    (video?.extra as { extraVideos?: string[] })?.extraVideos?.filter(Boolean) ||
    [...aboutExtraVideos];
  const helpfulVideos =
    (helpfulVideosSection?.extra as { videos?: string[] })?.videos?.filter(Boolean) ||
    [...helpfulInfoVideos];

  const milestones = [
    { year: "1962", event: "Fred D. Huffman founds the company" },
    { year: "1972", event: "10 years of experience, company growing" },
    { year: "1980", event: "Brent Huffman joins at age 19" },
    { year: "2024", event: "Brent continues the family legacy" },
  ];

  return (
    <>
      <HeroSection
        title={hero?.title || "About Huffman Heating & Air"}
        subtitle={hero?.subtitle || "A Legacy of Quality Since 1962"}
        content={hero?.content}
        image={hero?.image}
      />

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <FadeIn direction="left">
              <span className="text-huffman-red font-bold text-sm tracking-widest uppercase">
                {story?.subtitle || "Founded by Fred D. Huffman"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-huffman-dark mt-3 mb-6 sm:mb-8">
                {story?.title || "Our Story"}
              </h2>
              <div className="prose prose-sm sm:prose-lg text-gray-600 space-y-4">
                {(story?.content || "").split("\n\n").map((para, i) => (
                  <p key={i} className="leading-relaxed">{para}</p>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="space-y-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <SafeImage
                    src={storyImage}
                    alt="Brent and Fred Huffman with Huffman Heating service truck"
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-bold text-sm sm:text-base">Brent &amp; Fred Huffman</p>
                    <p className="text-white/80 text-xs sm:text-sm">Family owned since 1962</p>
                  </div>
                </div>

                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl gradient-red-blue flex items-center justify-center text-white font-black text-xs sm:text-sm">
                      {m.year}
                    </div>
                    <div className="pt-2 sm:pt-3">
                      <p className="font-semibold text-huffman-dark text-sm sm:text-base">{m.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About video */}
      <section className="section-padding bg-huffman-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-2 text-huffman-red font-bold text-sm tracking-widest uppercase mb-3">
              <Play size={16} />
              {video?.subtitle || "Family Owned Since 1962"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-huffman-dark mt-2 mb-4">
              {video?.title || "Huffman Heating & Air Conditioning"}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              {video?.content ||
                "Watch our story — over 60 years of trusted heating and air conditioning service in Catawba County."}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video">
              <video
                src={videoUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
                poster="/images/about-family.png"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </FadeIn>

          {extraVideos.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mt-8 sm:mt-10 max-w-xl mx-auto">
              {extraVideos.map((src, i) => (
                <FadeIn key={src} delay={0.2 + i * 0.08}>
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
          )}
        </div>
      </section>

      {/* Helpful videos & information */}
      {helpfulVideos.length > 0 && (
        <section className="section-padding bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <FadeIn className="text-center mb-8 sm:mb-12">
              <span className="inline-flex items-center gap-2 text-huffman-blue font-bold text-sm tracking-widest uppercase mb-3">
                <Info size={16} />
                {helpfulVideosSection?.subtitle || "Tips From Huffman Heating"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-huffman-dark mt-2 mb-4">
                {helpfulVideosSection?.title || "Helpful Videos & Information"}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                {helpfulVideosSection?.content ||
                  "Short videos with helpful information about your heating and air conditioning system."}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {helpfulVideos.map((src, i) => (
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
      )}

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {[
              {
                icon: Heart,
                title: "Family Values",
                desc:
                  "Treating every customer like family — the same values Fred Huffman built this company on over 60 years ago.",
              },
              {
                icon: Award,
                title: "Quality Work",
                desc:
                  "Over 60 years of trusted craftsmanship and dependable service you can count on year after year.",
              },
              {
                icon: Calendar,
                title: "Since 1962",
                desc:
                  "Three generations of HVAC expertise proudly serving Catawba County and surrounding communities.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1} className="h-full">
                <div className="bg-huffman-gray rounded-2xl p-6 sm:p-8 shadow-md card-hover text-center h-full flex flex-col items-center">
                  <item.icon className="w-12 h-12 mb-4 text-huffman-red flex-shrink-0" />
                  <h3 className="text-xl font-bold text-huffman-dark mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-huffman-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <MapPin className="w-12 h-12 mx-auto mb-4 text-huffman-blue" />
            <h2 className="text-3xl sm:text-4xl font-black text-huffman-dark mb-4">
              {serviceArea?.title || "Service Area"}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              {serviceArea?.content}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Catawba County", "Conover, NC", "Newton, NC", "Maiden, NC", "Taylorsville, NC", "Hickory, NC", "Claremont, NC"].map((area) => (
                <span key={area} className="px-4 py-2 rounded-full bg-white text-huffman-dark font-semibold text-sm">
                  {area}
                </span>
              ))}
            </div>
            <div className="mt-12">
              <Button href="/contact" variant="primary">Request Install Estimate</Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
