"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Wrench,
  MessageSquare,
  HelpCircle,
  Image,
  FileText,
  Users,
  TrendingUp,
} from "lucide-react";

interface Stats {
  counts: {
    services: number;
    testimonials: number;
    faqs: number;
    gallery: number;
    leads: number;
    pages: number;
  };
  recentLeads: Array<{ name: string; email: string; message: string; createdAt: string }>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin/login");
          return;
        }
        return fetch("/api/admin/stats");
      })
      .then((r) => r?.json())
      .then((data) => {
        if (data?.success) setStats(data.data);
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-huffman-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const cards = [
    { label: "Services", value: stats?.counts.services || 0, icon: Wrench, href: "/admin/services", color: "text-huffman-red" },
    { label: "Testimonials", value: stats?.counts.testimonials || 0, icon: MessageSquare, href: "/admin/testimonials", color: "text-huffman-blue" },
    { label: "FAQs", value: stats?.counts.faqs || 0, icon: HelpCircle, href: "/admin/faqs", color: "text-huffman-red" },
    { label: "Gallery Categories", value: stats?.counts.gallery || 0, icon: Image, href: "/admin/gallery", color: "text-huffman-blue" },
    { label: "Pages", value: stats?.counts.pages || 0, icon: FileText, href: "/admin/pages", color: "text-huffman-red" },
    { label: "New Leads", value: stats?.counts.leads || 0, icon: TrendingUp, href: "/admin", color: "text-green-600" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-huffman-dark">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to Huffman Heating Admin Panel</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all card-hover">
              <card.icon className={`w-6 h-6 ${card.color} mb-3`} />
              <div className="text-2xl font-black text-huffman-dark">{card.value}</div>
              <div className="text-xs text-gray-500 font-medium mt-1">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-huffman-dark mb-4 flex items-center gap-2">
            <Users size={20} className="text-huffman-blue" />
            Recent Leads
          </h2>
          {stats?.recentLeads?.length ? (
            <div className="space-y-3">
              {stats.recentLeads.map((lead, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm text-huffman-dark">{lead.name}</p>
                      <p className="text-xs text-gray-400">{lead.email}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{lead.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No leads yet</p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-huffman-dark mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Edit Home Page", href: "/admin/pages/home" },
              { label: "Add Service", href: "/admin/services" },
              { label: "Add Testimonial", href: "/admin/testimonials" },
              { label: "Update Settings", href: "/admin/settings" },
              { label: "Manage Gallery", href: "/admin/gallery" },
              { label: "View Website", href: "/", external: true },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                className="p-3 bg-huffman-gray rounded-xl text-sm font-semibold text-huffman-dark hover:bg-gray-200 transition-colors text-center"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
