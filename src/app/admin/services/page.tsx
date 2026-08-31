"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  mainImage: string;
  icon: string;
  isActive: boolean;
}

export default function AdminServices() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newService, setNewService] = useState({ title: "", shortDescription: "", icon: "🔧" });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin/login");
        return fetch("/api/services");
      })
      .then((r) => r?.json())
      .then((data) => {
        if (data?.success) setServices(data.data);
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleAdd = async () => {
    if (!newService.title) return;
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setServices([...services, data.data]);
      setShowAdd(false);
      setNewService({ title: "", shortDescription: "", icon: "🔧" });
      toast.success("Service added!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      setServices(services.filter((s) => s._id !== id));
      toast.success("Service deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="p-4 sm:p-6 lg:p-8">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-huffman-dark">Services</h1>
          <p className="text-gray-500 mt-1">Manage your service offerings</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="admin-btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-bold mb-4">New Service</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input className="admin-input" placeholder="Service Title" value={newService.title}
              onChange={(e) => setNewService({ ...newService, title: e.target.value })} />
            <input className="admin-input" placeholder="Short Description" value={newService.shortDescription}
              onChange={(e) => setNewService({ ...newService, shortDescription: e.target.value })} />
            <input className="admin-input" placeholder="Icon (emoji)" value={newService.icon}
              onChange={(e) => setNewService({ ...newService, icon: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <button onClick={handleAdd} className="admin-btn-primary">Create Service</button>
            <button onClick={() => setShowAdd(false)} className="admin-btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map((service) => (
          <div key={service._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl">{service.icon}</span>
              <div>
                <p className="font-bold text-huffman-dark">{service.title}</p>
                <p className="text-sm text-gray-400">{service.shortDescription}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/services/${service._id}`}
                className="p-2 rounded-lg bg-huffman-gray hover:bg-gray-200 transition-colors">
                <Edit size={16} className="text-huffman-blue" />
              </Link>
              <button onClick={() => handleDelete(service._id)}
                className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
