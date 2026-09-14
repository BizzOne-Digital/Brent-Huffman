"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Shield, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faqs", label: "FAQs" },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Our Team" },
  { href: "/contact", label: "Contact" },
];

const serviceSubLinks = [
  { href: "/services", label: "All Services" },
  { href: "/services/heat-pumps", label: "Heat Pumps" },
  { href: "/services/gas-furnaces", label: "Gas Furnaces" },
  { href: "/services/cooling", label: "Cooling" },
  { href: "/services/gas-packs", label: "All-in-One Gas Packs" },
  { href: "/services/metal-ductwork", label: "All Metal Ductwork" },
  { href: "/services/system-troubles", label: "Signs of System Trouble" },
  { href: "/services/system-troubles#helpful-videos", label: "Helpful Videos" },
];

interface HeaderProps {
  phone?: string;
}

export default function Header({ phone = "828-256-2675" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setServicesOpen(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const telHref = `tel:${phone.replace(/\D/g, "")}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top announcement bar */}
      <div className="bg-[#0a1628] py-2 px-4 text-center">
        <p className="text-white/90 text-[11px] sm:text-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2 tracking-wide leading-snug">
          <Shield size={13} className="text-white/70 flex-shrink-0 hidden sm:inline" />
          <span className="text-balance">
            <span className="sm:hidden">Discounts for Seniors, Military, Law Enforcement &amp; First Responders</span>
            <span className="hidden sm:inline">Special Discounts for Seniors, Military, Law Enforcement &amp; First Responders</span>
          </span>
        </p>
      </div>

      {/* Main nav */}
      <div className="px-2 sm:px-4 transition-all duration-300">
        <div
          className={`max-w-[1400px] mx-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all duration-300 ${
            scrolled
              ? "bg-[#0d1b2a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mt-1 sm:mt-2"
              : "bg-[#0d1b2a]/60 backdrop-blur-md border border-white/10 rounded-b-2xl"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group min-w-0">
            <div className="relative h-11 w-28 sm:h-14 sm:w-36 md:h-16 md:w-44 lg:h-[4.5rem] lg:w-52 transition-transform group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Huffman Heating & Air Conditioning"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.hasDropdown ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-huffman-red"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className="opacity-70" />
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-huffman-red rounded-full" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative block px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-huffman-red"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-huffman-red rounded-full" />
                    )}
                  </Link>
                )}

                {link.hasDropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-[#0d1b2a]/95 backdrop-blur-xl border border-white/10 rounded-xl py-2 min-w-[200px] shadow-2xl">
                      {serviceSubLinks.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Mobile phone icon */}
            <a
              href={telHref}
              className="lg:hidden flex items-center justify-center min-h-11 min-w-11 rounded-full bg-huffman-red/90 hover:bg-huffman-red text-white transition-all"
              aria-label={`Call ${phone}`}
            >
              <Phone size={18} />
            </a>

            {/* Desktop Phone CTA */}
            <a
              href={telHref}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-huffman-red hover:bg-huffman-red-dark text-white font-bold text-sm rounded-full transition-all shadow-lg hover:shadow-red-500/30 flex-shrink-0"
            >
              <Phone size={15} />
              {phone}
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden flex items-center justify-center min-h-11 min-w-11 text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:hidden fixed inset-x-0 top-[var(--header-height,7.5rem)] bottom-0 bg-[#0d1b2a]/98 backdrop-blur-xl border-t border-white/10 overflow-y-auto z-40"
          >
            <nav className="flex flex-col p-4 gap-1 max-w-lg mx-auto">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                        isActive(link.href)
                          ? "text-huffman-red bg-white/5"
                          : "text-white/85 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {serviceSubLinks.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? "text-huffman-red bg-white/5"
                        : "text-white/85 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a
                href={telHref}
                className="flex items-center justify-center gap-2 mt-4 px-4 py-3.5 bg-huffman-red text-white font-bold rounded-full text-sm min-h-12"
              >
                <Phone size={15} />
                Call {phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
