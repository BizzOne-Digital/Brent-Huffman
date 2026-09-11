"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";
import LocalImageField from "@/components/admin/LocalImageField";
import { PageSection } from "@/lib/types";

export default function AdminPageEditor() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [page, setPage] = useState<{ title: string; sections: PageSection[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) { router.push("/admin/login"); return; }
        return fetch(`/api/pages/${slug}`);
      })
      .then((r) => r?.json())
      .then((data) => {
        if (data?.success) setPage(data.data);
      })
      .finally(() => setLoading(false));
  }, [slug, router]);

  const savePage = useCallback(
    async (data: { title: string; sections: PageSection[] }, silent = false) => {
      setSaving(true);
      try {
        const res = await fetch(`/api/pages/${slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: data.title, sections: data.sections }),
        });
        const result = await res.json();
        if (!result.success) throw new Error(result.error);
        if (!silent) toast.success("Page saved!");
        else toast.success("Image saved to website!");
        return true;
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Save failed");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [slug]
  );

  const updateSection = (key: string, field: keyof PageSection, value: string) => {
    if (!page) return;
    const sections = page.sections.map((s) =>
      s.key === key ? { ...s, [field]: value } : s
    );
    const updated = { ...page, sections };
    setPage(updated);

    // Auto-save when image changes so it appears on the site immediately
    if (field === "image") {
      savePage(updated, true);
    }
  };

  const handleSave = async () => {
    if (!page) return;
    await savePage(page);
  };

  if (loading) return <div className="p-4 sm:p-6 lg:p-8">Loading...</div>;
  if (!page) return <div className="p-4 sm:p-6 lg:p-8">Page not found</div>;

  const sortedSections = [...page.sections].sort((a, b) => a.order - b.order);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/pages" className="text-gray-400 hover:text-huffman-dark">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-huffman-dark capitalize">{slug} Page</h1>
            <p className="text-gray-400 text-sm">Edit section by section — images save automatically</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2">
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-8">
        {sortedSections.map((section, index) => (
          <div key={section.key} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-huffman-gray rounded-full text-xs font-bold text-huffman-dark uppercase">
                {section.key}
              </span>
              <h2 className="font-bold text-huffman-dark">Section {index + 1}</h2>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="admin-label">Title</label>
                <input
                  className="admin-input"
                  value={section.title}
                  onChange={(e) => updateSection(section.key, "title", e.target.value)}
                />
              </div>
              <div>
                <label className="admin-label">Subtitle</label>
                <input
                  className="admin-input"
                  value={section.subtitle || ""}
                  onChange={(e) => updateSection(section.key, "subtitle", e.target.value)}
                />
              </div>
              <div>
                <label className="admin-label">Content</label>
                <textarea
                  className="admin-input resize-none"
                  rows={4}
                  value={section.content}
                  onChange={(e) => updateSection(section.key, "content", e.target.value)}
                />
              </div>
              <LocalImageField
                label="Section Image"
                value={section.image}
                onChange={(url) => updateSection(section.key, "image", url)}
                folder="pages"
              />
              {section.image && (
                <p className="text-xs text-gray-400 break-all">Saved URL: {section.image}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
