"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

interface Settings {
  businessName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  serviceAreas: string[];
  socialLinks: { facebook: string; facebookReel: string; facebookPost: string };
  specialOffers: { seniors: string; lawEnforcement: string; military: string };
  footerText: string;
  hours: string;
}

export default function AdminSettings() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin/login");
        return fetch("/api/settings");
      })
      .then((r) => r?.json())
      .then((data) => { if (data?.success) setSettings(data.data); })
      .finally(() => setLoading(false));
  }, [router]);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast.success("Settings saved! Footer and contact page updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4 sm:p-6 lg:p-8">Loading...</div>;
  if (!settings) return <div className="p-4 sm:p-6 lg:p-8">Settings not found</div>;

  const update = (field: string, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  const updateNested = (parent: string, field: string, value: string) => {
    setSettings({
      ...settings,
      [parent]: { ...(settings[parent as keyof Settings] as object), [field]: value },
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-huffman-dark">Settings</h1>
          <p className="text-gray-500 mt-1">Update contact info, social links, and site settings</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary flex items-center gap-2">
          <Save size={16} /> {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-huffman-dark mb-4">Business Info</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { key: "businessName", label: "Business Name" },
              { key: "tagline", label: "Tagline" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "address", label: "Address" },
              { key: "hours", label: "Business Hours" },
            ].map((field) => (
              <div key={field.key}>
                <label className="admin-label">{field.label}</label>
                <input className="admin-input" value={settings[field.key as keyof Settings] as string}
                  onChange={(e) => update(field.key, e.target.value)} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="admin-label">Service Areas (one per line)</label>
            <textarea className="admin-input resize-none" rows={4}
              value={settings.serviceAreas.join("\n")}
              onChange={(e) => setSettings({ ...settings, serviceAreas: e.target.value.split("\n").filter(Boolean) })} />
          </div>
          <div className="mt-4">
            <label className="admin-label">Footer Text</label>
            <textarea className="admin-input resize-none" rows={2} value={settings.footerText}
              onChange={(e) => update("footerText", e.target.value)} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-huffman-dark mb-4">Social Links</h2>
          <div className="space-y-4">
            {[
              { key: "facebook", label: "Facebook Page" },
              { key: "facebookReel", label: "Facebook Reel" },
              { key: "facebookPost", label: "Facebook Post" },
            ].map((field) => (
              <div key={field.key}>
                <label className="admin-label">{field.label}</label>
                <input className="admin-input" value={settings.socialLinks[field.key as keyof typeof settings.socialLinks]}
                  onChange={(e) => updateNested("socialLinks", field.key, e.target.value)} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-huffman-dark mb-4">Special Offers</h2>
          <div className="space-y-4">
            {[
              { key: "seniors", label: "Senior Citizens Discount" },
              { key: "lawEnforcement", label: "Law Enforcement Discount" },
              { key: "military", label: "Military Discount" },
            ].map((field) => (
              <div key={field.key}>
                <label className="admin-label">{field.label}</label>
                <input className="admin-input"
                  value={settings.specialOffers[field.key as keyof typeof settings.specialOffers]}
                  onChange={(e) => updateNested("specialOffers", field.key, e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
