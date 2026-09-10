"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import GoogleReviewBlock from "@/components/ui/GoogleReviewBlock";
import { PageSection } from "@/lib/types";

function getSection(sections: PageSection[], key: string) {
  return sections.find((s) => s.key === key);
}

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export default function TestimonialsClient({
  page,
  testimonials,
}: {
  page: { sections: PageSection[] } | null;
  testimonials: Testimonial[];
}) {
  const hero = getSection(page?.sections || [], "hero");
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <>
      <HeroSection
        title={hero?.title || "What Our Customers Say"}
        subtitle={hero?.subtitle || "Trusted by the Community"}
        content={hero?.content}
        image={hero?.image}
      />

      <section className="section-padding bg-huffman-gray">
        <div className="max-w-4xl mx-auto px-6">
          {testimonials.length > 0 ? (
            <FadeIn>
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl p-6 sm:p-10 md:p-16 shadow-xl text-center relative"
                  >
                    <Quote className="w-12 h-12 text-huffman-red/20 mx-auto mb-6" />
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 sm:mb-8 italic">
                      &ldquo;{testimonials[current].text}&rdquo;
                    </p>
                    <div>
                      <p className="font-bold text-huffman-dark text-lg">{testimonials[current].name}</p>
                      {testimonials[current].location && (
                        <p className="text-gray-400 text-sm">{testimonials[current].location}</p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {testimonials.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                      onClick={prev}
                      className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-huffman-red hover:text-white transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex gap-2">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          aria-label={`Go to testimonial ${i + 1}`}
                          className={`min-h-11 min-w-11 flex items-center justify-center rounded-full transition-all ${
                            i === current ? "" : ""
                          }`}
                        >
                          <span
                            className={`block rounded-full transition-all ${
                              i === current ? "bg-huffman-red w-6 h-2.5" : "bg-gray-300 w-2.5 h-2.5"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={next}
                      className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-huffman-blue hover:text-white transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            </FadeIn>
          ) : (
            <p className="text-center text-gray-500">No testimonials yet.</p>
          )}

          <div className="hidden md:grid md:grid-cols-2 gap-6 mt-16">
            {testimonials.map((t, i) => (
              <FadeIn key={t._id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-md card-hover">
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <p className="font-bold text-huffman-dark text-sm">{t.name}</p>
                  {t.location && <p className="text-gray-400 text-xs">{t.location}</p>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-red-blue">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-black text-white mb-2">Join Our Happy Customers</h2>
            <p className="text-white/85 mb-8">Had a great experience? We&apos;d love to hear from you.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
              <GoogleReviewBlock />
              <Button href="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
