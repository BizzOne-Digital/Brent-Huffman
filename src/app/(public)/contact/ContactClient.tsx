"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, MapPin, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import HeroSection from "@/components/ui/HeroSection";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import GoogleReviewBlock, { DEFAULT_GOOGLE_REVIEW_URL } from "@/components/ui/GoogleReviewBlock";
import { PageSection } from "@/lib/types";

function getSection(sections: PageSection[], key: string) {
  return sections.find((s) => s.key === key);
}

export default function ContactClient({
  page,
  settings,
}: {
  page: { sections: PageSection[] } | null;
  settings: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
    serviceAreas?: string[];
    socialLinks?: { googleReview?: string };
  } | null;
}) {
  const hero = getSection(page?.sections || [], "hero");
  const phone = settings?.phone || "828-256-2675";
  const email = (settings?.email || "brentuffman@huffmanheating.net").toLowerCase();
  const googleReviewUrl =
    settings?.socialLinks?.googleReview || DEFAULT_GOOGLE_REVIEW_URL;

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", service: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch soon.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      label: "Call Us",
      value: phone,
      href: `tel:${phone.replace(/\D/g, "")}`,
      color: "text-huffman-red",
      bg: "bg-red-50",
    },
    {
      icon: MessageSquare,
      label: "Text Us",
      value: phone,
      href: `sms:${phone.replace(/\D/g, "")}`,
      color: "text-huffman-blue",
      bg: "bg-blue-50",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: email,
      href: `mailto:${email}`,
      color: "text-huffman-red",
      bg: "bg-red-50",
    },
  ];

  return (
    <>
      <HeroSection
        title={hero?.title || "Contact Us"}
        subtitle={hero?.subtitle || "Contact Us Today"}
        content={hero?.content}
        image={hero?.image}
      />

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {contactMethods.map((method, i) => (
              <FadeIn key={method.label} delay={i * 0.1}>
                <a
                  href={method.href}
                  className={`flex flex-col items-center p-8 rounded-2xl ${method.bg} card-hover text-center group`}
                >
                  <method.icon className={`w-10 h-10 ${method.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="font-bold text-huffman-dark mb-1">{method.label}</h3>
                  <p className={`font-semibold text-xs sm:text-sm ${method.color} break-all`}>{method.value}</p>
                </a>
              </FadeIn>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <FadeIn direction="left">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center p-12"
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                  <h3 className="text-3xl font-black text-huffman-dark mb-4">Thank You!</h3>
                  <p className="text-gray-500 text-lg">
                    We&apos;ve received your message and will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl sm:text-3xl font-black text-huffman-dark mb-6">Send Us a Message</h2>
                  {[
                    { key: "name", label: "Your Name", type: "text", required: true },
                    { key: "email", label: "Email Address", type: "email", required: true },
                    { key: "phone", label: "Phone Number", type: "tel", required: false },
                    { key: "service", label: "Service Needed", type: "text", required: false },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-huffman-blue transition-all"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-huffman-blue transition-all resize-none"
                      placeholder="Tell us about your HVAC needs..."
                    />
                  </div>
                  <Button type="submit" variant="primary" disabled={loading}>
                    <Send size={18} />
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="bg-huffman-gray rounded-3xl p-8 h-full">
                <h3 className="text-2xl font-black text-huffman-dark mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-huffman-red flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-huffman-dark">Location</p>
                      <p className="text-gray-500">{settings?.address || "Newton, North Carolina"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-huffman-dark mb-3">Service Areas</p>
                    <div className="flex flex-wrap gap-2">
                      {(settings?.serviceAreas || []).map((area) => (
                        <span key={area} className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 font-medium">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl">
                    <p className="text-sm text-gray-500 font-medium">Business Hours</p>
                    <p className="font-semibold text-huffman-dark mt-1">
                      {settings?.hours || "Mon-Fri: 8AM-5PM"}
                    </p>
                  </div>
                  <div className="p-4 gradient-red-blue rounded-xl text-white text-center">
                    <p className="font-bold text-lg">Free Estimates on Replacements &amp; New Installs</p>
                    <p className="text-white/80 text-sm mt-1">Repairs are quoted at time of service — contact us today</p>
                  </div>
                  <GoogleReviewBlock className="pt-2" reviewUrl={googleReviewUrl} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
