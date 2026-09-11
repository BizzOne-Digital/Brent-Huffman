import StoredUpload from "@/models/StoredUpload";
import { connectDB } from "./mongodb";

const UPLOAD_PREFIX = "/api/uploads/";

export function isUploadUrl(url: string | undefined | null): boolean {
  return !!url && url.startsWith(UPLOAD_PREFIX);
}

export function parseUploadUrl(url: string): { folder: string; filename: string } | null {
  if (!isUploadUrl(url)) return null;
  const parts = url.replace(UPLOAD_PREFIX, "").split("/");
  if (parts.length !== 2) return null;
  const [folder, filename] = parts;
  if (!folder || !filename || filename.includes("..") || filename.includes("/")) {
    return null;
  }
  return { folder, filename };
}

export async function deleteUploadByUrl(url: string | undefined | null) {
  if (!url || !isUploadUrl(url)) return;
  const parsed = parseUploadUrl(url);
  if (!parsed) return;

  await connectDB();
  await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });
}

export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const MAX_UPLOAD_SIZE = 8 * 1024 * 1024; // 8MB

export function generateFilename(ext: string) {
  const random = Math.random().toString(16).slice(2, 10);
  return `${Date.now()}-${random}.${ext}`;
}

export function getExtFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return map[mime] || "bin";
}
