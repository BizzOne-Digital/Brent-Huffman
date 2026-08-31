"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Shield, Award, Users, Wrench, Calendar, Compass, Home as HomeIcon, BadgeCheck, Phone } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { PageSection } from "@/lib/types";
import { OFFER_PARTICLES } from "@/lib/particles";
import { getImageUrl } from "@/lib/seed-data";

interface HomeClientProps {
  page: { sections: PageSection[] } | null;
  services: Array<{
    _id: string;
    slug: string;
    title: string;
    shortDescription: string;
    mainImage: string;
    icon: string;
  }>;
  settings: {
    phone?: string;
    specialOffers?: { seniors?: string; lawEnforcement?: string; military?: string };
  } | null;
}

function getSection(sections: PageSection[], key: string) {
  return sections.find((s) => s.key === key);
}

export default function HomeClient({ page, services, settings }: HomeClientProps) {
  const sections = page?.sections || [];
  const hero = getSection(sections, "hero");
  const intro = getSection(sections, "intro");
  const video = getSection(sections, "video");
  const offers = getSection(sections, "offers");
  const cta = getSection(sections, "cta");
  const phone = settings?.phone || "828-256-2675";

  const heroImage = hero?.image ? getImageUrl(hero.image) : "/images/hero-bg.png";

  const stats = [
    { icon: Award, value: "60+", label: "Years Experience" },
    { icon: Users, value: "3", label: "Generations" },
    { icon: Shield, value: "100%", label: "Satisfaction" },
    { icon: Wrench, value: "Free", label: "Estimates" },
  ];

  return (
    <>
      {/* Hero — matches reference design */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background image */}
        <Image
          key={heroImage}
          src={heroImage}
          alt="Huffman Heating & Air Conditioning"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          unoptimized={heroImage.startsWith("/api/uploads/")}
        />

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full px-4 sm:px-8 lg:px-12 pt-32 sm:pt-36 md:pt-40 pb-8">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#e85d4a] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-5 sm:mb-6"
            >
              {hero?.subtitle || "Family-Owned Since 1962"}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-[4.25rem] font-bold text-white leading-[1.1] mb-5 sm:mb-8"
            >
              {hero?.title || "Comfort Built on Family Values."}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl"
            >
              {hero?.content ||
                "Trusted heating and air conditioning service across Catawba County—quality work, honest pricing, and dependable comfort."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 bg-huffman-red hover:bg-huffman-red-dark text-white font-bold text-sm rounded-full transition-all shadow-lg hover:shadow-red-500/30"
              >
                <Calendar size={17} />
                Schedule Service
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 border-2 border-white/70 hover:border-white text-white font-bold text-sm rounded-full transition-all hover:bg-white/10"
              >
                <Compass size={17} />
                Explore Services
              </Link>
            </motion.div>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-auto pt-12 sm:pt-16"
          >
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-0 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-full px-2 py-2 sm:px-3 w-full sm:w-auto">
              {[
                { icon: Shield, label: "60+ Years of Service", color: "text-huffman-red" },
                { icon: HomeIcon, label: "Local & Family-Owned", color: "text-huffman-blue" },
                { icon: BadgeCheck, label: "Quality at a Fair Price", color: "text-huffman-blue" },
              ].map((badge, i) => (
                <div
                  key={badge.label}
                  className={`flex items-center gap-2.5 px-3 sm:px-5 py-2.5 ${
                    i < 2 ? "sm:border-r border-white/10" : ""
                  } ${i < 2 ? "border-b sm:border-b-0 border-white/10" : ""}`}
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <badge.icon size={16} className={badge.color} />
                  </div>
                  <span className="text-white text-xs sm:text-sm font-semibold">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="text-center p-4 sm:p-6 rounded-2xl bg-huffman-gray card-hover">
                  <stat.icon className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-huffman-red" />
                  <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-huffman-gray wave-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn direction="left">
              <span className="text-huffman-red font-bold text-sm tracking-widest uppercase">
                {intro?.subtitle || "Trusted HVAC Experts"}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-huffman-dark mt-3 mb-6">
                {intro?.title || "Serving Our Community Since 1962"}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {intro?.content ||
                  "From gas and oil furnaces to heat pumps and all-metal ductwork — we specialize in residential and commercial heating and cooling solutions."}
              </p>
              <Button href="/about" variant="secondary">
                Our Story
              </Button>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video">
                <SafeImage
                  src={intro?.image || "/images/team.jpg"}
                  alt="Huffman Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-huffman-dark/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-bold text-lg">Family Owned & Operated</p>
                  <p className="text-white/80 text-sm">Brent Huffman & Team</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {video && (video.extra as { videoUrl?: string })?.videoUrl && (
        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="text-4xl font-black gradient-text mb-8">
                {video.title || "See Us In Action"}
              </h2>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video">
                <video
                  src={(video.extra as { videoUrl: string }).videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-huffman-blue font-bold text-sm tracking-widest uppercase">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-huffman-dark mt-3">
              Our Services
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Complete heating and cooling solutions for homes and businesses
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <FadeIn key={service._id} delay={i * 0.1}>
                <Link href={`/services/${service.slug}`}>
                  <div className="group card-hover rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100">
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-huffman-red/10 to-huffman-blue/10">
                      <SafeImage
                        src={service.mainImage}
                        alt={service.title}
                        fill
                        className="object-contain bg-white p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                      {service.icon ? (
                      <div className="absolute top-4 left-4 text-3xl">{service.icon}</div>
                      ) : null}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-huffman-dark group-hover:text-huffman-red transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {service.shortDescription}
                      </p>
                      <span className="inline-block mt-4 text-huffman-blue font-semibold text-sm group-hover:underline">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <Button href="/services" variant="primary">
              View All Services
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Special Offers */}
      <section className="section-padding gradient-red-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {OFFER_PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ left: p.left, top: p.top }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2 + (i % 5) * 0.6,
                repeat: Infinity,
                delay: (i % 8) * 0.25,
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              {offers?.title || "Special Offers"}
            </h2>
            <p className="text-white/90 text-base sm:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto">
              {offers?.content ||
                "We proudly offer special discounts to senior citizens, law enforcement, and military personnel."}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { emoji: "👴", label: "Senior Citizens", desc: settings?.specialOffers?.seniors },
                { emoji: "👮", label: "Law Enforcement", desc: settings?.specialOffers?.lawEnforcement },
                { emoji: "🎖️", label: "Military", desc: settings?.specialOffers?.military },
              ].map((offer, i) => (
                <motion.div
                  key={offer.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <div className="text-4xl mb-4">{offer.emoji}</div>
                  <h3 className="text-xl font-bold mb-2">{offer.label}</h3>
                  <p className="text-white/80 text-sm">{offer.desc || "Special discount available"}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-huffman-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              {cta?.title || "Ready for Comfort?"}
            </h2>
            <p className="text-gray-400 text-base sm:text-xl mb-8">
              {cta?.content || "Contact us today for a free estimate. No online pricing — personalized service."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary">
                Contact Us Today
              </Button>
              <Button href={`tel:${phone.replace(/\D/g, "")}`} variant="outline">
                <Phone size={18} />
                {phone}
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
