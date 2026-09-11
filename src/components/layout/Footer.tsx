"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Share2, Clock } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import GoogleReviewBlock, { DEFAULT_GOOGLE_REVIEW_URL } from "@/components/ui/GoogleReviewBlock";
import {
  buildMailtoHref,
  resolvePublicBusinessAddress,
  resolvePublicContactEmail,
} from "@/lib/contact-email";

interface FooterProps {
  settings?: {
    businessName?: string;
    email?: string;
    phone?: string;
    address?: string;
    serviceAreas?: string[];
    socialLinks?: { facebook?: string; googleReview?: string };
    footerText?: string;
    hours?: string;
    specialOffers?: {
      seniors?: string;
      lawEnforcement?: string;
      military?: string;
      firstResponders?: string;
    };
  };
}

export default function Footer({ settings }: FooterProps) {
  const phone = settings?.phone || "828-256-2675";
  const email = resolvePublicContactEmail(settings?.email);
  const mailtoHref = buildMailtoHref(email, {
    subject: "Huffman Heating & Air — Website inquiry",
  });
  const businessName = settings?.businessName || "Huffman Heating & Air Conditioning";
  const facebook = settings?.socialLinks?.facebook || "https://www.facebook.com/share/1C3vvLwWrV/";
  const googleReviewUrl =
    settings?.socialLinks?.googleReview || DEFAULT_GOOGLE_REVIEW_URL;

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/team", label: "Our Team" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/faqs", label: "FAQs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-huffman-dark text-white">
      {/* Special offers banner */}
      <div className="gradient-red-blue py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-sm md:text-base font-semibold tracking-wide text-balance leading-snug">
            🎖️ Special Discounts for Seniors, Law Enforcement, Military & First Responders
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <FadeIn>
            <div className="flex flex-col items-start">
              <Link href="/" className="mb-6 block">
                <div className="relative h-28 w-60 sm:h-32 sm:w-64">
                  <Image
                    src="/images/logo.png"
                    alt={businessName}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {settings?.footerText ||
                  "Family owned and operated since 1962. Quality work at reasonable prices."}
              </p>
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-sm transition-colors shadow-md"
                aria-label="Follow us on Facebook"
              >
                <Share2 size={18} />
                <span>Follow us on Facebook</span>
              </a>
              <GoogleReviewBlock
                variant="dark"
                className="mt-6 items-start text-left"
                reviewUrl={googleReviewUrl}
              />
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn delay={0.1}>
            <h3 className="text-lg font-bold mb-6 gradient-text">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-huffman-red transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={0.2}>
            <h3 className="text-lg font-bold mb-6 gradient-text">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <Phone size={16} className="text-huffman-red flex-shrink-0" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={mailtoHref}
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors text-sm break-all"
                >
                  <Mail size={16} className="text-huffman-blue flex-shrink-0" />
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="text-huffman-red flex-shrink-0 mt-0.5" />
                {resolvePublicBusinessAddress(settings?.address)}
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Clock size={16} className="text-huffman-blue flex-shrink-0 mt-0.5" />
                {settings?.hours || "Mon-Fri: 8AM-5PM"}
              </li>
            </ul>
          </FadeIn>

          {/* Service Areas */}
          <FadeIn delay={0.3}>
            <h3 className="text-lg font-bold mb-6 gradient-text">Service Areas</h3>
            <ul className="space-y-2">
              {(settings?.serviceAreas || [
                "Catawba County",
                "Conover, NC",
                "Newton, NC",
                "Maiden, NC",
                "Taylorsville, NC",
                "Hickory, NC",
                "Claremont, NC",
              ]).map((area) => (
                <li key={area} className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-huffman-red" />
                  {area}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/contact"
              className="text-sm font-semibold shimmer-btn px-6 py-2 rounded-full text-white"
            >
              Get Free Install Estimate
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
