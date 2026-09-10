"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, Trash2, Save } from "lucide-react";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export default function AdminFAQs() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin/login");
        return fetch("/api/faqs");
      })
      .then((r) => r?.json())
      .then((data) => { if (data?.success) setFaqs(data.data); })
      .finally(() => setLoading(false));
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all(
        faqs.map((f) =>
          fetch(`/api/faqs/${f._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(f),
          })
        )
      );
      toast.success("FAQs saved!");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const addFAQ = async () => {
    try {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: "New Question?", answer: "Answer here.", order: faqs.length }),
      });
      const data = await res.json();
      if (data.success) setFaqs([...faqs, data.data]);
    } catch {
      toast.error("Failed to add");
    }
  };

  const deleteFAQ = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    try {
      await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      setFaqs(faqs.filter((f) => f._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const update = (index: number, field: keyof FAQ, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  if (loading) return <div className="p-4 sm:p-6 lg:p-8">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-huffman-dark">FAQs</h1>
          <p className="text-gray-500 mt-1">Manage frequently asked questions</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addFAQ} className="admin-btn-secondary flex items-center gap-2">
            <Plus size={16} /> Add
          </button>
          <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2">
            <Save size={16} /> {saving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={faq._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-huffman-dark">FAQ {index + 1}</h3>
              <button onClick={() => deleteFAQ(faq._id)} className="admin-btn-danger">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="admin-label">Question</label>
                <input className="admin-input" value={faq.question}
                  onChange={(e) => update(index, "question", e.target.value)} />
              </div>
              <div>
                <label className="admin-label">Answer</label>
                <textarea className="admin-input resize-none" rows={3} value={faq.answer}
                  onChange={(e) => update(index, "answer", e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
