"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import LocalImageField from "@/components/admin/LocalImageField";
import { ServiceDetailSection } from "@/lib/types";

interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  mainImage: string;
  icon: string;
  features: string[];
  detailSections: ServiceDetailSection[];
}

export default function AdminServiceEditor() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState<"description" | "detail">("description");
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) { router.push("/admin/login"); return; }
        return fetch(`/api/services/${id}`);
      })
      .then((r) => r?.json())
      .then((data) => { if (data?.success) setService(data.data); })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleSave = async (data?: Service, silent = false) => {
    const toSave = data || service;
    if (!toSave) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toSave),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      toast.success(silent ? "Image saved to website!" : "Service saved!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const updateMainImage = (url: string) => {
    if (!service) return;
    const updated = { ...service, mainImage: url };
    setService(updated);
    handleSave(updated, true);
  };

  const updateDetailSection = (index: number, field: keyof ServiceDetailSection, value: string) => {
    if (!service) return;
    const sections = [...service.detailSections];
    sections[index] = { ...sections[index], [field]: value };
    const updated = { ...service, detailSections: sections };
    setService(updated);
    if (field === "image") handleSave(updated, true);
  };

  const addDetailSection = () => {
    if (!service) return;
    setService({
      ...service,
      detailSections: [
        ...service.detailSections,
        { key: `section-${Date.now()}`, title: "", content: "", image: "", order: service.detailSections.length },
      ],
    });
  };

  const removeDetailSection = (index: number) => {
    if (!service) return;
    setService({ ...service, detailSections: service.detailSections.filter((_, i) => i !== index) });
  };

  if (loading) return <div className="p-4 sm:p-6 lg:p-8">Loading...</div>;
  if (!service) return <div className="p-4 sm:p-6 lg:p-8">Service not found</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/services" className="text-gray-400 hover:text-huffman-dark">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-black text-huffman-dark">{service.title}</h1>
        </div>
        <button onClick={() => handleSave()} disabled={saving} className="admin-btn-primary flex items-center gap-2">
          <Save size={16} /> {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="flex gap-2 mb-8">
        {(["description", "detail"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              activeTab === tab
                ? "bg-gradient-to-r from-huffman-red to-huffman-blue text-white"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {tab === "description" ? "Description (Listing)" : "Detail Page"}
          </button>
        ))}
      </div>

      {activeTab === "description" && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="admin-label">Title</label>
            <input className="admin-input" value={service.title}
              onChange={(e) => setService({ ...service, title: e.target.value })} />
          </div>
          <div>
            <label className="admin-label">Short Description</label>
            <textarea className="admin-input resize-none" rows={3} value={service.shortDescription}
              onChange={(e) => setService({ ...service, shortDescription: e.target.value })} />
          </div>
          <div>
            <label className="admin-label">Icon (emoji)</label>
            <input className="admin-input w-24" value={service.icon}
              onChange={(e) => setService({ ...service, icon: e.target.value })} />
          </div>
          <LocalImageField label="Main Image (Services Page)" value={service.mainImage}
            onChange={updateMainImage} folder="products" />
          <div>
            <label className="admin-label">Features (one per line)</label>
            <textarea className="admin-input resize-none" rows={4}
              value={service.features.join("\n")}
              onChange={(e) => setService({ ...service, features: e.target.value.split("\n").filter(Boolean) })} />
          </div>
        </div>
      )}

      {activeTab === "detail" && (
        <div className="space-y-6">
          {service.detailSections.map((section, index) => (
            <div key={section.key} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-huffman-dark">Detail Section {index + 1}</h3>
                <button onClick={() => removeDetailSection(index)} className="admin-btn-danger flex items-center gap-1">
                  <Trash2 size={14} /> Remove
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="admin-label">Title</label>
                  <input className="admin-input" value={section.title}
                    onChange={(e) => updateDetailSection(index, "title", e.target.value)} />
                </div>
                <div>
                  <label className="admin-label">Content</label>
                  <textarea className="admin-input resize-none" rows={4} value={section.content}
                    onChange={(e) => updateDetailSection(index, "content", e.target.value)} />
                </div>
                <LocalImageField label="Section Image" value={section.image}
                  onChange={(url) => updateDetailSection(index, "image", url)} folder="products" />
              </div>
            </div>
          ))}
          <button onClick={addDetailSection} className="admin-btn-secondary flex items-center gap-2 w-full justify-center py-3">
            <Plus size={16} /> Add Detail Section
          </button>
        </div>
      )}
    </div>
  );
}
