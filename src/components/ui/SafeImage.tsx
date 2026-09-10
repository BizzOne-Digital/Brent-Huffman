"use client";

import Image from "next/image";
import { getImageUrl } from "@/lib/seed-data";

interface SafeImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

export default function SafeImage({
  src,
  alt,
  width,
  height,
  className = "",
  fill,
  priority,
  sizes,
}: SafeImageProps) {
  const imageSrc = getImageUrl(src || "/images/placeholder.svg");
  const isUpload = imageSrc.startsWith("/api/uploads/");
  const isStaticGallery = imageSrc.startsWith("/gallery/");
  const unoptimized = isUpload || isStaticGallery;

  if (fill) {
    return (
      <Image
        key={imageSrc}
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || "100vw"}
        unoptimized={unoptimized}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/images/placeholder.svg";
        }}
      />
    );
  }

  return (
    <Image
      key={imageSrc}
      src={imageSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      priority={priority}
      unoptimized={unoptimized}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/images/placeholder.svg";
      }}
    />
  );
}
