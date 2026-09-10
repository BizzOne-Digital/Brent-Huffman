"use client";

import Link from "next/link";
import HeroSection from "@/components/ui/HeroSection";
import FadeIn from "@/components/ui/FadeIn";
import SafeImage from "@/components/ui/SafeImage";
import Button from "@/components/ui/Button";
import { PageSection } from "@/lib/types";
import { Phone } from "lucide-react";

function getSection(sections: PageSection[], key: string) {
  return sections.find((s) => s.key === key);
}

interface Service {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  mainImage: string;
  icon: string;
  features: string[];
}

export default function ServicesClient({
  page,
  services,
}: {
  page: { sections: PageSection[] } | null;
  services: Service[];
}) {
  const hero = getSection(page?.sections || [], "hero");

  return (
    <>
      <HeroSection
        title={hero?.title || "Our Services"}
        subtitle={hero?.subtitle || "Complete Heating & Cooling Solutions"}
        content={hero?.content}
        image={hero?.image}
      >
        <Button href="/contact" variant="outline">Request Install Estimate</Button>
      </HeroSection>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-gray-500 text-lg">
              Free estimates on replacements and new installations. Repairs are quoted at time of service.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <FadeIn key={service._id} delay={i * 0.08}>
                <Link href={`/services/${service.slug}`}>
                  <div className="group card-hover rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100 h-full flex flex-col">
                    <div className="relative h-52 overflow-hidden">
                      <SafeImage
                        src={service.mainImage}
                        alt={service.title}
                        fill
                        className="object-contain bg-white p-3 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {service.icon && (
                        <div className="absolute bottom-4 left-4 text-4xl">{service.icon}</div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-huffman-dark group-hover:text-huffman-red transition-colors mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-sm flex-1">{service.shortDescription}</p>
                      {service.features?.length > 0 && (
                        <ul className="mt-4 space-y-1">
                          {service.features.slice(0, 3).map((f) => (
                            <li key={f} className="text-sm text-huffman-blue flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-huffman-red" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      <span className="inline-block mt-4 text-huffman-red font-bold text-sm">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 gradient-red-blue text-center text-white px-4 sm:px-6">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-black mb-4">Need a Custom Solution?</h2>
          <p className="text-white/90 mb-8">Call us for a free estimate on replacements and new installs</p>
          <Button href="tel:8282562675" variant="outline">
            <Phone size={18} />
            828-256-2675
          </Button>
        </FadeIn>
      </section>
    </>
  );
}
