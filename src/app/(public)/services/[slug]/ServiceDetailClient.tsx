"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Phone,
  Calendar,
  ChevronRight,
  Shield,
  Award,
  Wrench,
  ArrowRight,
  Home,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SafeImage from "@/components/ui/SafeImage";
import { ServiceDetailSection } from "@/lib/types";
import { getImageUrl } from "@/lib/seed-data";

interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  mainImage: string;
  icon: string;
  features: string[];
  detailSections: ServiceDetailSection[];
}

interface RelatedService {
  slug: string;
  title: string;
  shortDescription: string;
  mainImage: string;
  icon: string;
}

const INSTALL_PROCESS_STEPS = [
  { step: "01", title: "Free Install Estimate", desc: "Contact us for a no-obligation quote on replacements and new installations." },
  { step: "02", title: "Expert Assessment", desc: "We evaluate your space and recommend the best solution." },
  { step: "03", title: "Professional Install", desc: "Our skilled team completes the job with quality craftsmanship." },
  { step: "04", title: "Ongoing Support", desc: "We stand behind our work with reliable service and support." },
];

function getHeroImage(src?: string) {
  const url = getImageUrl(src || "");
  if (!url || url.includes("placeholder")) return "/images/hero-bg.png";
  return url;
}

export default function ServiceDetailClient({
  service,
  relatedServices = [],
}: {
  service: Service;
  relatedServices?: RelatedService[];
}) {
  const heroImage = getHeroImage(service.mainImage);
  const sections = [...(service.detailSections || [])].sort((a, b) => a.order - b.order);
  const isInstallService = service.slug !== "system-troubles";

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={service.title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-20">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-white/60 text-sm mb-8 flex-wrap"
          >
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={14} />
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium truncate max-w-[180px] sm:max-w-none">{service.title}</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-5">
                <span className="inline-block px-4 py-1.5 rounded-full bg-huffman-red/90 text-white text-xs font-bold tracking-widest uppercase">
                  Huffman Service
                </span>
              </div>
              <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-5">
                {service.title}
              </h1>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mb-6 sm:mb-8">
                {service.shortDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-huffman-red hover:bg-huffman-red-dark text-white font-bold text-sm rounded-full transition-all shadow-lg"
                >
                  <Calendar size={17} />
                  {isInstallService ? "Free Install Estimate" : "Schedule Service"}
                </Link>
                <a
                  href="tel:8282562675"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/60 hover:border-white text-white font-bold text-sm rounded-full transition-all hover:bg-white/10"
                >
                  <Phone size={17} />
                  828-256-2675
                </a>
              </div>
            </motion.div>

            {/* Quick highlights — desktop */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:grid grid-cols-2 gap-3"
            >
              {[
                { icon: Shield, label: "Licensed & Insured" },
                { icon: Award, label: "60+ Years Experience" },
                { icon: Wrench, label: "Quality Craftsmanship" },
                { icon: CheckCircle, label: isInstallService ? "Free Install Estimates" : "Expert Diagnostics" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4"
                >
                  <item.icon size={22} className="text-huffman-red flex-shrink-0" />
                  <span className="text-white text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Quick highlights — mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 gap-2 sm:gap-3 mt-6 lg:hidden"
          >
            {[
              { icon: Shield, label: "Licensed & Insured" },
              { icon: Award, label: "60+ Years Experience" },
              { icon: Wrench, label: "Quality Craftsmanship" },
              { icon: CheckCircle, label: isInstallService ? "Free Install Estimates" : "Expert Diagnostics" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl sm:rounded-2xl p-3 sm:p-4"
              >
                <item.icon size={18} className="text-huffman-red flex-shrink-0 sm:hidden" />
                <item.icon size={22} className="text-huffman-red flex-shrink-0 hidden sm:block" />
                <span className="text-white text-xs sm:text-sm font-semibold leading-tight">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features strip */}
      {service.features?.length > 0 && (
        <section className="bg-huffman-dark border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {service.features.map((feature, i) => (
                <FadeIn key={feature} delay={i * 0.08}>
                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-huffman-red/20 flex items-center justify-center flex-shrink-0 group-hover:bg-huffman-red/40 transition-colors">
                      <CheckCircle size={18} className="text-huffman-red" />
                    </div>
                    <span className="text-white/90 text-sm font-semibold">{feature}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Detail sections */}
      {sections.length > 0 ? (
        sections.map((section, i) => (
          <section
            key={section.key}
            className={`py-20 sm:py-24 ${i % 2 === 0 ? "bg-white" : "bg-huffman-gray"}`}
          >
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
              <div
                className={`${
                  section.image
                    ? `grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                        i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                      }`
                    : "max-w-3xl mx-auto"
                }`}
              >
                <FadeIn direction={i % 2 === 0 ? "left" : "right"}>
                  <span className="text-huffman-red font-bold text-sm tracking-[0.2em] uppercase">
                    {String(i + 1).padStart(2, "0")} — Details
                  </span>
                  <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-huffman-dark mt-3 mb-6 leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-8 text-huffman-red font-bold text-sm hover:gap-3 transition-all"
                  >
                    Request This Service
                    <ArrowRight size={16} />
                  </Link>
                </FadeIn>

                {section.image && (
                <FadeIn direction={i % 2 === 0 ? "right" : "left"} delay={0.15}>
                  <div className="relative overflow-hidden">
                    <div className="absolute -inset-1 sm:-inset-3 rounded-3xl bg-gradient-to-br from-huffman-red/20 to-huffman-blue/20 blur-sm" />
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                      <SafeImage
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                </FadeIn>
                )}
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeIn>
              <h2 className="font-serif-display text-3xl font-bold text-huffman-dark mb-4">
                Professional {service.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {service.shortDescription} Huffman Heating &amp; Air Conditioning has been delivering
                quality work at reasonable prices since 1962.{" "}
                {isInstallService
                  ? "Contact us today for a free estimate on replacements and new installations."
                  : "Contact us to schedule service — repair pricing is provided at time of service."}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-huffman-red text-white font-bold rounded-full hover:bg-huffman-red-dark transition-colors"
              >
                <Calendar size={17} />
                {isInstallService ? "Request Free Install Estimate" : "Schedule Service"}
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* How it works — installs only */}
      {isInstallService && (
      <section className="py-20 sm:py-24 bg-huffman-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-huffman-red blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-huffman-blue blur-3xl" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 relative z-10">
          <FadeIn className="text-center mb-14">
            <span className="text-huffman-red font-bold text-sm tracking-[0.2em] uppercase">
              Simple Process
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mt-3">
              How It Works
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTALL_PROCESS_STEPS.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.1}>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors group">
                  <span className="text-5xl font-black text-white/10 group-hover:text-huffman-red/30 transition-colors absolute top-4 right-4">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl gradient-red-blue flex items-center justify-center text-white font-black text-sm mb-5">
                    {item.step}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Why Huffman */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <span className="text-huffman-blue font-bold text-sm tracking-[0.2em] uppercase">
                Why Choose Us
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-huffman-dark mt-3 mb-6">
                The Huffman Difference
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Family owned and operated since 1962, Huffman Heating &amp; Air Conditioning brings
                over 60 years of trusted expertise to every job. Brent Huffman continues his
                father&apos;s legacy of quality work at reasonable prices across Catawba County.
              </p>
              <ul className="space-y-4">
                {[
                  "Free estimates on replacements — we do not offer free estimates on service or repair",
                  "Special discounts for seniors, military & law enforcement",
                  "Residential and light commercial expertise",
                  "All metal ductwork specialists",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-huffman-red flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <SafeImage src="/images/team.jpg" alt="Huffman Team" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-huffman-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-xl">Family Owned Since 1962</p>
                  <p className="text-white/70 text-sm mt-1">Serving Catawba County &amp; surrounding areas</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-huffman-gray">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
            <FadeIn className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <span className="text-huffman-red font-bold text-sm tracking-[0.2em] uppercase">
                  Explore More
                </span>
                <h2 className="font-serif-display text-3xl font-bold text-huffman-dark mt-2">
                  Other Services
                </h2>
              </div>
              <Link
                href="/services"
                className="text-huffman-blue font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All Services <ArrowRight size={16} />
              </Link>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.slice(0, 3).map((s, i) => (
                <FadeIn key={s.slug} delay={i * 0.1}>
                  <Link href={`/services/${s.slug}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-md card-hover h-full flex flex-col">
                      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-huffman-red/10 to-huffman-blue/10">
                        <SafeImage
                          src={getHeroImage(s.mainImage)}
                          alt={s.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-huffman-dark group-hover:text-huffman-red transition-colors mb-2">
                          {s.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2 flex-1">{s.shortDescription}</p>
                        <span className="inline-flex items-center gap-1 mt-4 text-huffman-blue font-semibold text-sm">
                          Learn More <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-red-blue" />
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/hero-bg.png" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready for {service.title}?
            </h2>
            <p className="text-white/85 text-lg mb-10">
              {isInstallService
                ? "Contact Huffman Heating & Air for a free estimate on replacements and new installations."
                : "Contact Huffman Heating & Air to schedule service. Repair estimates are provided at time of service."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-huffman-red font-bold rounded-full hover:bg-gray-100 transition-colors shadow-xl"
              >
                <Calendar size={18} />
                {isInstallService ? "Request Install Estimate" : "Schedule Service"}
              </Link>
              <a
                href="tel:8282562675"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                <Phone size={18} />
                Call 828-256-2675
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
