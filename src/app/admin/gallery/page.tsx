"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Plus, Trash2, ChevronRight } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  images: Array<{ url: string; caption: string; order: number }>;
}

export default function AdminGallery() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin/login");
        return fetch("/api/gallery");
      })
      .then((r) => r?.json())
      .then((data) => { if (data?.success) setCategories(data.data); })
      .finally(() => setLoading(false));
  }, [router]);

  const handleAdd = async () => {
    if (!newName) return;
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setCategories([...categories, data.data]);
      setShowAdd(false);
      setNewName("");
      toast.success("Category added!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category and all its images?")) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      setCategories(categories.filter((c) => c._id !== id));
      toast.success("Category deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="p-4 sm:p-6 lg:p-8">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-huffman-dark">Gallery</h1>
          <p className="text-gray-500 mt-1">Manage gallery categories and images</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="admin-btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Category
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6 flex gap-4">
          <input className="admin-input flex-1" placeholder="Category Name" value={newName}
            onChange={(e) => setNewName(e.target.value)} />
          <button onClick={handleAdd} className="admin-btn-primary">Create</button>
          <button onClick={() => setShowAdd(false)} className="admin-btn-secondary">Cancel</button>
        </div>
      )}

      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
            <Link href={`/admin/gallery/${cat._id}`} className="flex items-center gap-4 flex-1">
              <div>
                <p className="font-bold text-huffman-dark">{cat.name}</p>
                <p className="text-sm text-gray-400">{cat.images?.length || 0} images</p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Link href={`/admin/gallery/${cat._id}`} className="p-2 rounded-lg bg-huffman-gray hover:bg-gray-200">
                <ChevronRight size={16} className="text-huffman-blue" />
              </Link>
              <button onClick={() => handleDelete(cat._id)} className="p-2 rounded-lg bg-red-50 hover:bg-red-100">
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
