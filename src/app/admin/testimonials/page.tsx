"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, Trash2, Save } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  isActive: boolean;
}

export default function AdminTestimonials() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin/login");
        return fetch("/api/testimonials");
      })
      .then((r) => r?.json())
      .then((data) => { if (data?.success) setTestimonials(data.data); })
      .finally(() => setLoading(false));
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all(
        testimonials.map((t) =>
          fetch(`/api/testimonials/${t._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(t),
          })
        )
      );
      toast.success("Testimonials saved!");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const addTestimonial = async () => {
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "New Customer", text: "Great service!", rating: 5, location: "" }),
      });
      const data = await res.json();
      if (data.success) setTestimonials([...testimonials, data.data]);
    } catch {
      toast.error("Failed to add");
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      setTestimonials(testimonials.filter((t) => t._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const update = (index: number, field: keyof Testimonial, value: string | number) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  if (loading) return <div className="p-4 sm:p-6 lg:p-8">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-huffman-dark">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage customer reviews</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addTestimonial} className="admin-btn-secondary flex items-center gap-2">
            <Plus size={16} /> Add
          </button>
          <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2">
            <Save size={16} /> {saving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {testimonials.map((t, index) => (
          <div key={t._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-huffman-dark">Testimonial {index + 1}</h3>
              <button onClick={() => deleteTestimonial(t._id)} className="admin-btn-danger">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Customer Name</label>
                <input className="admin-input" value={t.name}
                  onChange={(e) => update(index, "name", e.target.value)} />
              </div>
              <div>
                <label className="admin-label">Location</label>
                <input className="admin-input" value={t.location}
                  onChange={(e) => update(index, "location", e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="admin-label">Review Text</label>
                <textarea className="admin-input resize-none" rows={3} value={t.text}
                  onChange={(e) => update(index, "text", e.target.value)} />
              </div>
              <div>
                <label className="admin-label">Rating (1-5)</label>
                <input type="number" min={1} max={5} className="admin-input w-24" value={t.rating}
                  onChange={(e) => update(index, "rating", parseInt(e.target.value))} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
