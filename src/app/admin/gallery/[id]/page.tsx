"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import LocalImageField from "@/components/admin/LocalImageField";

interface GalleryImage {
  url: string;
  caption: string;
  order: number;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  images: GalleryImage[];
}

export default function AdminGalleryCategory() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) { router.push("/admin/login"); return; }
        return fetch(`/api/gallery/${id}`);
      })
      .then((r) => r?.json())
      .then((data) => { if (data?.success) setCategory(data.data); })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleSave = async () => {
    if (!category) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast.success("Gallery saved!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const addImage = (url: string) => {
    if (!category || !url) return;
    setCategory({
      ...category,
      images: [...category.images, { url, caption: "", order: category.images.length }],
    });
  };

  const updateImage = (index: number, field: keyof GalleryImage, value: string) => {
    if (!category) return;
    const images = [...category.images];
    images[index] = { ...images[index], [field]: value };
    setCategory({ ...category, images });
  };

  const removeImage = (index: number) => {
    if (!category) return;
    setCategory({ ...category, images: category.images.filter((_, i) => i !== index) });
  };

  if (loading) return <div className="p-4 sm:p-6 lg:p-8">Loading...</div>;
  if (!category) return <div className="p-4 sm:p-6 lg:p-8">Category not found</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/gallery" className="text-gray-400 hover:text-huffman-dark">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-black text-huffman-dark">{category.name}</h1>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2">
          <Save size={16} /> {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <label className="admin-label">Category Description</label>
        <input className="admin-input" value={category.description}
          onChange={(e) => setCategory({ ...category, description: e.target.value })} />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="font-bold text-huffman-dark mb-4">Add New Image</h2>
        <LocalImageField label="Upload Image" value="" onChange={addImage} folder="gallery" />
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-huffman-dark">Images ({category.images.length})</h2>
        {category.images.map((img, index) => (
          <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <LocalImageField label="" value={img.url}
                onChange={(url) => updateImage(index, "url", url)} folder="gallery" />
              <div className="flex-1">
                <label className="admin-label">Caption</label>
                <input className="admin-input" value={img.caption}
                  onChange={(e) => updateImage(index, "caption", e.target.value)} />
              </div>
              <button onClick={() => removeImage(index)} className="admin-btn-danger mt-6">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
