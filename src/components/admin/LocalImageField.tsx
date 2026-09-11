"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { UploadFolder } from "@/lib/upload";

interface LocalImageFieldProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: UploadFolder;
  label?: string;
}

export default function LocalImageField({
  value,
  onChange,
  folder = "pages",
  label = "Image",
}: LocalImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      if (value) {
        await fetch("/api/upload/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: value }),
        }).catch(() => {});
      }

      onChange(data.url);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (value) {
      try {
        await fetch("/api/upload/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: value }),
        });
      } catch {
        // silent
      }
    }
    onChange("");
  };

  const imageSrc = value || "";

  return (
    <div>
      <label className="admin-label">{label}</label>
      <div className="flex items-start gap-4">
        {imageSrc ? (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
            <Image
              key={imageSrc}
              src={imageSrc.startsWith("/") ? imageSrc : `/${imageSrc}`}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/placeholder.svg";
              }}
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center flex-shrink-0 bg-gray-50">
            <Upload size={24} className="text-gray-400" />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="admin-btn-secondary flex items-center gap-2 text-sm"
          >
            {uploading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Upload size={16} />
            )}
            {uploading ? "Uploading..." : imageSrc ? "Replace" : "Upload Image"}
          </button>
          {imageSrc && (
            <button
              type="button"
              onClick={handleRemove}
              className="admin-btn-danger flex items-center gap-2 text-sm"
            >
              <X size={16} />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
