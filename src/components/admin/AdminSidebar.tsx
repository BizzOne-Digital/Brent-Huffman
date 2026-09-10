"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Wrench,
  Image,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <>
      <div className="p-5 sm:p-6 border-b border-white/10">
        <h1 className="text-lg font-black gradient-text">Huffman Admin</h1>
        <p className="text-xs text-gray-400 mt-1">Content Management</p>
      </div>

      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all min-h-11 ${
                isActive
                  ? "bg-gradient-to-r from-huffman-red to-huffman-blue text-white shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 sm:p-4 border-t border-white/10 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all min-h-11"
        >
          <ExternalLink size={18} />
          View Website
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all min-h-11"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-huffman-dark text-white border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <h1 className="text-base font-black gradient-text">Huffman Admin</h1>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center min-h-11 min-w-11 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-huffman-dark text-white flex-col min-h-screen flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-huffman-dark text-white flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-end p-3 border-b border-white/10">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center min-h-11 min-w-11 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
