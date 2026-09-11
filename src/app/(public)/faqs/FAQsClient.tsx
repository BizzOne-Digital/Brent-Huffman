"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import { PageSection } from "@/lib/types";

function getSection(sections: PageSection[], key: string) {
  return sections.find((s) => s.key === key);
}

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQsClient({
  page,
  faqs,
}: {
  page: { sections: PageSection[] } | null;
  faqs: FAQ[];
}) {
  const hero = getSection(page?.sections || [], "hero");
  const [open, setOpen] = useState<string | null>(faqs[0]?._id || null);

  return (
    <>
      <HeroSection
        title={hero?.title || "Frequently Asked Questions"}
        subtitle={hero?.subtitle || "Got Questions? We Have Answers"}
        content={hero?.content}
        image={hero?.image}
      />

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeIn key={faq._id} delay={i * 0.05}>
                <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpen(open === faq._id ? null : faq._id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-huffman-gray/50 transition-colors"
                  >
                    <span className="font-bold text-huffman-dark pr-4 text-sm sm:text-base min-w-0">{faq.question}</span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-huffman-red/10 flex items-center justify-center text-huffman-red">
                      {open === faq._id ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {open === faq._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-huffman-gray text-center px-4 sm:px-6">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-black text-huffman-dark mb-4">Still Have Questions?</h2>
          <p className="text-gray-500 mb-8">We&apos;re here to help — reach out anytime</p>
          <Button href="/contact" variant="primary">Contact Us</Button>
        </FadeIn>
      </section>
    </>
  );
}
