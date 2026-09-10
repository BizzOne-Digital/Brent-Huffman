"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";

const PAGE_LIST = [
  { slug: "home", label: "Home" },
  { slug: "about", label: "About Us" },
  { slug: "services", label: "Services" },
  { slug: "gallery", label: "Gallery" },
  { slug: "testimonials", label: "Testimonials" },
  { slug: "faqs", label: "FAQs" },
  { slug: "contact", label: "Contact" },
  { slug: "team", label: "Our Team" },
];

export default function AdminPagesList() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div className="p-4 sm:p-6 lg:p-8">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-black text-huffman-dark mb-2">Pages</h1>
      <p className="text-gray-500 mb-8">Manage content for each page on your website</p>

      <div className="grid md:grid-cols-2 gap-4">
        {PAGE_LIST.map((page) => (
          <Link key={page.slug} href={`/admin/pages/${page.slug}`}>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all card-hover flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-huffman-gray flex items-center justify-center">
                  <FileText size={20} className="text-huffman-blue" />
                </div>
                <div>
                  <p className="font-bold text-huffman-dark">{page.label}</p>
                  <p className="text-xs text-gray-400">/{page.slug === "home" ? "" : page.slug}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-huffman-red transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
